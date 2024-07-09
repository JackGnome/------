import { catalogActions } from '@/store/catalog/catalogSlice';
import { getSearchFilters, searchProducts } from '@/store/catalog/requests';
import { ProductSearchRequest } from '@/store/catalog/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, CallEffect, put, PutEffect, SagaReturnType, takeLatest } from '@redux-saga/core/effects';

export function* searchProductListSaga(action: PayloadAction<ProductSearchRequest>): Generator<CallEffect | PutEffect> {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const response: SagaReturnType<typeof searchProducts> = yield call(searchProducts, action.payload);
        const { content, ...details } = response.data;
        yield put(catalogActions.finishSearchingProducts({ details, content }));
    } catch (_) {
        yield put(catalogActions.abortSearchingProducts());
    }
}

export function* searchFiltersSaga(): Generator<CallEffect | PutEffect> {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const response: SagaReturnType<typeof getSearchFilters> = yield call(getSearchFilters);
        yield put(catalogActions.finishGettingSearchFilters(response.data));
    } catch (_) {
        yield put(catalogActions.abortGettingSearchFilters);
    }
}

export function* catalogSagas(): Generator {
    yield all([
        yield takeLatest([catalogActions.startSearchingProducts], searchProductListSaga),
        yield takeLatest([catalogActions.startGettingSearchFilters], searchFiltersSaga),
    ]);
}
