import { Product, ProductSearchFilter } from '@/store/catalog/types';
import { IState } from '@/store/types';

export const itemsSelector = (state: IState): Product[] | null => state.catalog.productList.items;
const searchFiltersSelector = (state: IState): ProductSearchFilter => state.catalog.filters.value;

export const catalogSelectors = {
    itemsSelector,
    searchFiltersSelector,
};
