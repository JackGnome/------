package store.jackgnome.djarenaservice.model.product

data class ProductSearchFilterDto(
    var brands: Set<String>,
    var price: PriceFilter,
) {
    constructor(brands: Set<String>, minPrice: Double?, maxPrice: Double?) :
            this(brands, PriceFilter(minPrice, maxPrice))

    data class PriceFilter(
        var min: Double?,
        var max: Double?,
    )
}



