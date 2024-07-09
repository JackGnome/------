import { catalogActions } from '@/store/catalog/catalogSlice';
import { catalogSelectors } from '@/store/catalog/selectors';
import { Button, Checkbox, Form, Input } from 'antd';
import { Store } from 'rc-field-form/lib/interface';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ProductFilter.module.scss';

export type Filters = {
    brands: string[];
    price: {
        min: string;
        max: string;
    };
};

export interface IProductFilterProps {
    handleFilters: (filters: Filters) => void;
}

const ProductFilter: React.FC<IProductFilterProps> = ({ handleFilters }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const filters = useSelector(catalogSelectors.searchFiltersSelector);

    useEffect(() => {
        dispatch(catalogActions.startGettingSearchFilters());
    }, [dispatch]);

    const renderBrands = (): React.ReactNode[] => {
        return filters.brands.map((brand) => {
            return (
                <Checkbox className={styles.option} value={brand} key={brand}>
                    {brand}
                </Checkbox>
            );
        });
    };

    const onFormSubmit = (values: Store): void => {
        const { minPrice, maxPrice, brands } = values;
        const price = {
            max: typeof maxPrice === 'string' && maxPrice.length > 0 ? maxPrice : filters.price.max?.toString() || '',
            min: typeof minPrice === 'string' && minPrice.length > 0 ? minPrice : filters.price.min?.toString() || '',
        };

        const appliedFilters: Filters = {
            brands: brands || [],
            price,
        };

        handleFilters(appliedFilters);
    };

    return (
        <Form form={form} className={styles.rootWrapper} onFinish={onFormSubmit}>
            <div className={styles.section}>
                <div className={styles.header}>Бренд</div>
                <Form.Item name="brands">
                    <Checkbox.Group className={styles.optionGroup}>{renderBrands()}</Checkbox.Group>
                </Form.Item>
            </div>
            <div className={styles.section}>
                <div className={styles.header}>Цена</div>
                <div className={styles.priceInputWrapper}>
                    <Form.Item name="minPrice">
                        <Input className={styles.priceInput} placeholder={`${filters.price.min ?? '0'} ₽`} />
                    </Form.Item>
                    <Form.Item name="maxPrice">
                        <Input className={styles.priceInput} placeholder={`${filters.price.max ?? '100 000'} ₽`} />
                    </Form.Item>
                </div>
            </div>
            <Button className={styles.redButton} htmlType="submit">
                Применить
            </Button>
        </Form>
    );
};

export default ProductFilter;
