import { apiInvoker } from '@/services/api/apiTools';
import { Product, ProductGetRequest } from '@/store/product/types';
import { AxiosResponse } from 'axios';

export const getProduct = async (request: ProductGetRequest): Promise<AxiosResponse<Product>> => {
    return apiInvoker.get<Product>(`/api/v1/products/${request.id}`);
};
