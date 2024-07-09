import { Product } from '@/store/product/types';
import { IState } from '@/store/types';

const productSelector = (state: IState): Product => state.product.product;

export const productSelectors = {
    productSelector,
};
