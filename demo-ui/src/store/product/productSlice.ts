import { Brand, IProductState, Product, ProductGetRequest } from '@/store/product/types';
import { Status } from '@/store/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IProductState = {
    product: {
        id: '',
        vendorCode: '',
        name: '',
        preview: '',
        brand: {
            id: '',
            name: '',
            isArchived: false,
        },
        isArchive: false,
    },
    status: Status.None,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        startGettingProduct(state, action: PayloadAction<ProductGetRequest>) {
            state.status = Status.Loading;
        },
        finishGettingProduct(state, action: PayloadAction<Product>) {
            state.product = action.payload;
            state.status = Status.Success;
        },
        abortGettingProduct(state) {
            state.status = Status.Failed;
        },
    },
});

export const productActions = productSlice.actions;
