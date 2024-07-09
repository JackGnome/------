// General types
export type Company = {
    name: string;
    inn: string;
    kpp: string;
    ogrn: string;
    address: string;
    raschetniySchet: string;
    korSchet: string;
    bik: string;
};

export type Product = {
    name: string;
    amount: number;
    unitName: number;
    price: number;
};

export enum InvoiceType {
    TOCHKA = 'TOCHKA',
    RAFI = 'RAFI',
}

export type Order = {
    productItems: Product[];
};

export type InvoiceCreateRequest = {
    date: string;
    id: number;
    type: InvoiceType;
    company: Company;
    order: Order;
};

// State
export enum Status {
    Loading,
    Failed,
    Success,
    None,
}

export interface IDocumentState {
    createInvoice: {
        status: Status;
    };
}
