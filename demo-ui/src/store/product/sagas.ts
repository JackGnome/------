import { productActions } from '@/store/product/productSlice';
import { getProduct } from '@/store/product/requests';
import { ProductGetRequest } from '@/store/product/types';
import { all, call, CallEffect, put, PutEffect, SagaReturnType, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';

export function* getProductSaga(action: PayloadAction<ProductGetRequest>): Generator<CallEffect | PutEffect> {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const response: SagaReturnType<typeof getProduct> = yield call(getProduct, action.payload);
        yield put(productActions.finishGettingProduct(response.data));
    } catch (_) {
        yield put(productActions.abortGettingProduct());
    }
}

export function* productSaga(): Generator {
    yield all([yield takeLatest([productActions.startGettingProduct], getProductSaga)]);
}
