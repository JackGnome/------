import Footer from '@/shared/components/Footer/Footer';
import HeaderMenu from '@/shared/components/HeaderMenu/HeaderMenu';
import PageLayout from '@/shared/components/PageLayout/PageLayout';
import PageSection, { PageSectionColor } from '@/shared/components/PageSection/PageSection';
import { productActions } from '@/store/product/productSlice';
import { productSelectors } from '@/store/product/selectors';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';

const ProductPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    console.log(router.query.id);
    const product = useSelector(productSelectors.productSelector);

    useEffect(() => {
        const { id } = router.query;
        if (typeof id === 'string' && id.length > 0) {
            dispatch(productActions.startGettingProduct({ id }));
        }
    }, [dispatch, router]);

    return (
        <PageLayout>
            <HeaderMenu />
            <PageSection color={PageSectionColor.TRANSPARENT}>
                <div className={styles.rootWrapper}>
                    <div className={styles.descriptionWrapper}>
                        <div className={styles.name}>{product.name}</div>
                        <div className={styles.price}>{product.price} ₽</div>
                        <div className={styles.description}>{product.description}</div>
                        <div className={styles.parameters}>
                            <div className={styles.title}>Бренд</div>
                            <div className={styles.value}>{product.brand.name}</div>
                        </div>
                    </div>
                    <div className={styles.photosWrapper}>
                        <Image
                            className={styles.preview}
                            src={product.preview}
                            alt="product-preview"
                            width={1024}
                            height={1024}
                        />
                    </div>
                </div>
            </PageSection>
            <Footer />
        </PageLayout>
    );
};

export default ProductPage;
