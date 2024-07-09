import rootReducer from '@/store/rootReducer';
import rootSaga from '@/store/rootSaga';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/src/configureStore';
import { createWrapper } from 'next-redux-wrapper';

const sagaMiddleware = createSagaMiddleware();

export const makeStore = (): EnhancedStore => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [sagaMiddleware],
        devTools: true,
    });

    sagaMiddleware.run(rootSaga);
    return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
