import { createAction } from '@reduxjs/toolkit';
import { InvoiceCreateRequest } from '@/store/document/types';

const ACTION_PREFIX = 'document';

export const createInvoice = {
    start: createAction<InvoiceCreateRequest>(`${ACTION_PREFIX}/createInvoice/start`),
    success: createAction(`${ACTION_PREFIX}/createInvoice/success`),
    failure: createAction(`${ACTION_PREFIX}/createInvoice/failure`),
};
