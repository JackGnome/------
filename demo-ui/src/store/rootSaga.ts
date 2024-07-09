import { catalogSagas } from '@/store/catalog/sagas';
import { productSaga } from '@/store/product/sagas';
import { fork } from '@redux-saga/core/effects';

export default function* rootSaga(): Generator {
    yield fork(catalogSagas);
    yield fork(productSaga);
}
