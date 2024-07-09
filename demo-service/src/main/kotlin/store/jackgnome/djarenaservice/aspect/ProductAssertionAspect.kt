package store.jackgnome.djarenaservice.aspect

import java.util.UUID
import org.aspectj.lang.annotation.Aspect
import org.aspectj.lang.annotation.Before
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.Ordered
import org.springframework.core.annotation.Order
import org.springframework.stereotype.Component
import store.jackgnome.djarenaservice.exception.ItemAlreadyExistsException
import store.jackgnome.djarenaservice.exception.ItemArchivedException
import store.jackgnome.djarenaservice.exception.ItemNotFoundException
import store.jackgnome.djarenaservice.model.product.ProductCreateRequest
import store.jackgnome.djarenaservice.model.product.ProductEntity
import store.jackgnome.djarenaservice.model.product.ProductUpdateRequest
import store.jackgnome.djarenaservice.repository.ProductRepository

@Component
@Aspect
@Order(Ordered.LOWEST_PRECEDENCE)
class ProductAssertionAspect {

    @Autowired
    private lateinit var repository: ProductRepository

    @Before("execution(public * * (..)) && @annotation(AssertionProductNotExistsByVendorCodeAndIdNot) && args(request)")
    fun assertProductEntityNotExistsByVendorCodeAndIdNot(request: ProductUpdateRequest) {
        if (repository.existsByVendorCodeAndIdNot(request.vendorCode, request.id)) {
            throw ItemAlreadyExistsException(
                ProductEntity::class.simpleName.toString(),
                "vendorCode",
                request.vendorCode
            )
        }
    }

    @Before("execution(public * * (..)) && @annotation(AssertionProductNotExistsByVendorCode) && args(request)")
    fun assertProductNotExistsByVendorCode(request: ProductCreateRequest) {
        if (repository.existsByVendorCode(request.vendorCode)) {
            throw ItemAlreadyExistsException(
                ProductEntity::class.simpleName.toString(),
                "vendorCode",
                request.vendorCode
            )
        }
    }

    @Before("execution(public * * (..)) && @annotation(AssertionProductIsNotArchived) && args(request)")
    fun assertProductIsNotArchived(request: ProductUpdateRequest) {
        assertProductIsNotArchived(request.id)
    }

    @Before("execution(public * * (..)) && @annotation(AssertionProductIsNotArchived) && args(..,id)")
    fun assertProductIsNotArchived(id: UUID) {
        val productEntity = getById(id)
        if (productEntity.isArchived) {
            throw ItemArchivedException(ProductEntity::class.toString(), "id", productEntity.id.toString())
        }
    }

    private fun getById(id: UUID): ProductEntity {
        return repository.findById(id)
            .orElseThrow { ItemNotFoundException(ProductEntity::class.simpleName.toString(), "id", id.toString()) }
    }
}

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AssertionProductIsNotArchived

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AssertionProductNotExistsByVendorCodeAndIdNot

@Target(AnnotationTarget.FUNCTION)
@Retention(AnnotationRetention.RUNTIME)
annotation class AssertionProductNotExistsByVendorCode