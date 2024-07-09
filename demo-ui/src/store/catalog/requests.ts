import { apiInvoker } from '@/services/api/apiTools';
import { Product, ProductSearchFilter, ProductSearchRequest } from '@/store/catalog/types';
import { PageableResponse } from '@/store/types';
import { AxiosResponse } from 'axios';

export const searchProducts = async (
    request: ProductSearchRequest,
): Promise<AxiosResponse<PageableResponse<Product>>> => {
    const { brand, ...rest } = request;
    let brandNames: null | string = null;
    let query: null | string = null;
    if (typeof brand?.name === 'string' && brand.name.length > 0) {
        brandNames = brand.name;
    }
    if (typeof rest.query === 'string' && rest.query.trim().length > 0) {
        query = rest.query.trim();
    }

    const params = { ...rest, query, 'brand.name': brandNames };

    return apiInvoker.get<PageableResponse<Product>>('/api/v1/products/search', {
        params,
    });
};

export const getSearchFilters = async (): Promise<AxiosResponse<ProductSearchFilter>> => {
    return apiInvoker.get<ProductSearchFilter>('/api/v1/products/search/filters');
};
