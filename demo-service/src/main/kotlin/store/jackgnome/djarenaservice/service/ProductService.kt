package store.jackgnome.djarenaservice.service

import io.github.oshai.kotlinlogging.KotlinLogging
import java.util.UUID
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile
import store.jackgnome.djarenaservice.aspect.AssertionProductIsNotArchived
import store.jackgnome.djarenaservice.aspect.AssertionProductNotExistsByVendorCode
import store.jackgnome.djarenaservice.aspect.AssertionProductNotExistsByVendorCodeAndIdNot
import store.jackgnome.djarenaservice.exception.ItemAlreadyArchivedException
import store.jackgnome.djarenaservice.exception.ItemNotArchivedException
import store.jackgnome.djarenaservice.exception.ItemNotFoundException
import store.jackgnome.djarenaservice.mapper.productMapper
import store.jackgnome.djarenaservice.model.product.ProductCreateRequest
import store.jackgnome.djarenaservice.model.product.ProductDto
import store.jackgnome.djarenaservice.model.product.ProductEntity
import store.jackgnome.djarenaservice.model.product.ProductUpdateRequest
import store.jackgnome.djarenaservice.repository.ProductRepository
import store.jackgnome.djarenaservice.storage.ProductPreviewStorage

@Service
class ProductService {

    @Autowired
    private lateinit var productRepository: ProductRepository

    @Autowired
    private lateinit var repository: ProductRepository

    @Autowired
    private lateinit var previewStorage: ProductPreviewStorage

    @Autowired
    private lateinit var brandService: BrandService

    val logger = KotlinLogging.logger {}

    fun getAll(isArchived: Boolean?, pageable: Pageable): Page<ProductDto> {
        isArchived?.let {
            return repository.findAllByArchived(isArchived, pageable).map(productMapper::toDto)
        }
        return repository.findAll(pageable).map(productMapper::toDto)
    }

    fun getById(id: UUID): ProductDto {
        return getProductEntity(id).let(productMapper::toDto)
    }

    fun getByVendorCode(vendorCode: String): ProductDto {
        return getProductEntityByVendorCode(vendorCode).let(productMapper::toDto)
    }

    @Transactional
    @AssertionProductNotExistsByVendorCode
    fun create(request: ProductCreateRequest): ProductDto {
        val productEntity = productMapper.toEntity(request).apply {
            brand = request.brandId?.let(brandService::getBrandEntity)
            preview = previewStorage.getDefaultImageUrl()
        }

        return productRepository.save(productEntity).let(productMapper::toDto)
    }

    @Transactional
    @AssertionProductNotExistsByVendorCodeAndIdNot
    @AssertionProductIsNotArchived
    fun update(request: ProductUpdateRequest): ProductDto {
        val productEntity = getProductEntity(request.id).apply {
            name = request.name
            price = request.price
            vendorCode = request.vendorCode
            brand = request.brandId?.let(brandService::getBrandEntity)
        }

        return productRepository.save(productEntity).let(productMapper::toDto)
    }

    @Transactional
    @AssertionProductIsNotArchived
    fun updatePreview(preview: MultipartFile, id: UUID): ProductDto {
        val productEntity = getProductEntity(id)
        productEntity.preview = previewStorage.save(preview, id)

        return productRepository.save(productEntity).let(productMapper::toDto)
    }

    @Transactional
    fun archive(id: UUID): ProductDto {
        val productEntity = getProductEntity(id)

        if (productEntity.isArchived) {
            throw ItemAlreadyArchivedException(ProductEntity::class.toString(), "id", id.toString())
        }

        productEntity.archive()
        return repository.save(productEntity).let(productMapper::toDto)
    }

    @Transactional
    fun restore(id: UUID): ProductDto {
        val productEntity = getProductEntity(id)

        if (productEntity.isNotArchived) {
            throw ItemNotArchivedException(ProductEntity::class.toString(), "id", id.toString())
        }

        productEntity.restore()
        return repository.save(productEntity).let(productMapper::toDto)
    }

    private fun getProductEntity(id: UUID): ProductEntity = productRepository.findById(id)
        .orElseThrow { ItemNotFoundException(ProductEntity::class.simpleName.toString(), "id", id.toString()) }

    private fun getProductEntityByVendorCode(vendorCode: String): ProductEntity =
        productRepository.findByVendorCode(vendorCode) ?:
        throw ItemNotFoundException(ProductEntity::class.simpleName.toString(), "vendorCode", vendorCode)
}