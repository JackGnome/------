import axios from 'axios';
import { InvoiceCreateRequest } from '@/store/document/types';

const DOMAIN = 'http://localhost:8080';
export const apiInvoker = axios.create({ baseURL: DOMAIN });

export const createInvoice = (request: InvoiceCreateRequest): Promise<void> => {
    // console.log(DOMAIN);
    return apiInvoker.post('documents/invoices', request);
};
