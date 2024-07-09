import { createReducer } from '@reduxjs/toolkit';
import { IDocumentState, Status } from '@/store/document/types';
import { createInvoice } from '@/store/document/actions';

export const documentInitialState: IDocumentState = {
    createInvoice: {
        status: Status.None,
    },
};

export const documentReducer = createReducer(documentInitialState, (builder) => {
    builder
        .addCase(createInvoice.start, (state: IDocumentState) => ({
            ...state,
            createInvoice: {
                ...state.createInvoice,
                status: Status.Loading,
            },
        }))
        .addCase(createInvoice.success, (state: IDocumentState) => ({
            ...state,
            createInvoice: {
                ...state.createInvoice,
                status: Status.Success,
            },
        }))
        .addCase(createInvoice.failure, (state: IDocumentState) => ({
            ...state,
            createInvoice: {
                ...state.createInvoice,
                status: Status.Failed,
            },
        }));
});
