package store.jackgnome.djarenaservice.model.product

import java.util.UUID
import store.jackgnome.djarenaservice.model.brand.BrandDto

data class ProductDto (
    var id: UUID,
    var vendorCode: String,
    var name: String,
    var price: Double?,
    var description: String?,
    var preview: String,
    var brand: BrandDto?,
    var isArchived: Boolean,
)