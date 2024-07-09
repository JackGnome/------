import { PageableDetails, Status } from '@/store/types';

// General types

export type Product = {
    id: string;
    vendorCode: string;
    name: string;
    price?: number;
    preview: string;
};

// Requests

export type ProductSearchRequest = {
    size?: number;
    page?: number;
    isArchived?: boolean;
    query?: string;
    sort?: string;
    brand?: {
        name?: string;
    };
    price?: string;
};

// State
export type ProductSearchFilter = {
    brands: string[];
    price: {
        min: number | null;
        max: number | null;
    };
};

export interface ICatalogState {
    productList: {
        items: Product[] | null;
        details: PageableDetails | null;
        searchQuery: string | null;
        status: Status;
    };
    filters: {
        value: ProductSearchFilter;
        status: Status;
    };
}
