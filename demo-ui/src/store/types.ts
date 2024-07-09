import { ICatalogState } from '@/store/catalog/types';
import { IDocumentState } from '@/store/document/types';
import { IProductState } from '@/store/product/types';

export type PageableDetails = {
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            unsorted: boolean;
            empty: boolean;
        };
        offset: number;
        unpaged: boolean;
        paged: boolean;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    empty: boolean;
};

export type PageableResponse<T> = PageableDetails & {
    content: T[];
};

export enum Status {
    Loading,
    Failed,
    Success,
    None,
}

export interface IState {
    document: IDocumentState;
    catalog: ICatalogState;
    product: IProductState;
}
