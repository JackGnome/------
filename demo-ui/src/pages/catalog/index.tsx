import ProductCard from '@/pages/catalog/components/ProductCard/ProductCard';
import ProductFilter, { Filters } from '@/pages/catalog/components/ProductFilter/ProductFilter';
import Footer from '@/shared/components/Footer/Footer';
import HeaderMenu from '@/shared/components/HeaderMenu/HeaderMenu';
import PageLayout from '@/shared/components/PageLayout/PageLayout';
import PageSection, { PageSectionColor } from '@/shared/components/PageSection/PageSection';
import { catalogActions } from '@/store/catalog/catalogSlice';
import { itemsSelector } from '@/store/catalog/selectors';
import { Product } from '@/store/catalog/types';
import Search from 'antd/lib/input/Search';
import { NextPage } from 'next';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';

const CatalogPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const items = useSelector(itemsSelector);
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
    const [appliedFilters, setAppliedFilters] = useState<Filters>();

    const renderProductList = (): ReactNode[] | undefined => {
        return items?.map((item: Product): ReactNode => {
            const link = `/product/${item.vendorCode}`;
            return (
                <ProductCard
                    key={item.id}
                    link={link}
                    name={item.name}
                    price={`${item.price} ₽`}
                    preview={item.preview}
                />
            );
        });
    };

    const updateUrlParams = (): void => {
        const params = new URLSearchParams(searchParams?.toString() || undefined);
        if (typeof searchQuery === 'string' && searchQuery.trim().length > 0) {
            params.set('query', searchQuery.trim());
        }

        if (page > 1) {
            params.set('page', page.toString());
        }

        router.push(`${pathname}${params.toString() ? '?' : ''}${params.toString()}`);
    };

    const onSearch = (value: string): void => {
        setSearchQuery(value);
    };

    const handleFilters = (filters: Filters): void => {
        setAppliedFilters(filters);
    };

    const state = { page };

    useEffect(() => {
        let price: string | undefined;
        let brandNames: string | undefined;
        if (appliedFilters) {
            price = `${appliedFilters.price.min}-${appliedFilters.price.max}`;
            brandNames = appliedFilters.brands.join(',');
        }
        dispatch(
            catalogActions.startSearchingProducts({ page, query: searchQuery, price, brand: { name: brandNames } }),
        );
        updateUrlParams();
    }, [dispatch, page, searchQuery, appliedFilters]);

    return (
        <PageLayout>
            <HeaderMenu />
            <PageSection color={PageSectionColor.GRAY}>
                <div className={styles.catalogWrapper}>
                    <div className={styles.filterWrapper}>
                        <ProductFilter handleFilters={handleFilters} />
                    </div>
                    <div className={styles.productsWrapper}>
                        <div className={styles.catalogHeader}>
                            <div>СОРТИРОВАТЬ ПО: ЦЕНА</div>
                            <Search placeholder="ПОИСК" onSearch={onSearch} className={styles.search} />
                        </div>
                        {renderProductList()}
                    </div>
                </div>
            </PageSection>
            <Footer />
        </PageLayout>
    );
};

export default CatalogPage;
