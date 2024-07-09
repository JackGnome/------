import { Status } from '@/store/types';

export type Brand = {
    id: string;
    name: string;
    isArchived: boolean;
};

export type Product = {
    id: string;
    vendorCode: string;
    name: string;
    price?: number;
    description?: string;
    preview: string;
    brand: Brand;
    isArchive: boolean;
};

export type ProductGetRequest = {
    id: string;
};

export interface IProductState {
    product: Product;
    status: Status;
}
