import { ICatalogState, Product, ProductSearchFilter, ProductSearchRequest } from '@/store/catalog/types';
import { PageableDetails, Status } from '@/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ICatalogState = {
    productList: {
        items: [],
        details: null,
        searchQuery: null,
        status: Status.None,
    },
    filters: {
        value: {
            brands: [],
            price: {
                min: null,
                max: null,
            },
        },
        status: Status.None,
    },
};

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        // Filters
        startGettingSearchFilters(state) {
            state.filters.status = Status.Loading;
        },
        finishGettingSearchFilters(state, action: PayloadAction<ProductSearchFilter>) {
            state.filters.value = action.payload;
            state.filters.status = Status.Success;
        },
        abortGettingSearchFilters(state) {
            state.filters.status = Status.Failed;
        },
        // Product list
        startSearchingProducts(state, action: PayloadAction<ProductSearchRequest>) {
            state.productList.status = Status.Loading;
        },
        finishSearchingProducts(state, action: PayloadAction<{ details: PageableDetails; content: Product[] }>) {
            state.productList.details = action.payload.details;
            state.productList.items = action.payload.content;
            state.productList.status = Status.Success;
        },
        abortSearchingProducts(state) {
            state.productList.status = Status.Failed;
        },
    },
});

export const catalogActions = catalogSlice.actions;
