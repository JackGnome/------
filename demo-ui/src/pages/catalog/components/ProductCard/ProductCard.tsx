import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './ProductCard.module.scss';

interface IProductCardProps {
    link: string;
    name: string;
    price: string;
    preview: string;
}

const ProductCard: React.FC<IProductCardProps> = ({ ...props }) => {
    return (
        <div className={styles.rootWrapper}>
            <Link className={styles.linkWrapper} href={props.link}>
                <Image
                    className={styles.preview}
                    loader={() => props.preview}
                    src={props.preview}
                    alt="product image"
                    width={100}
                    height={100}
                />
                <p className={styles.name}>{props.name}</p>
                <p className={styles.price}>{props.price}</p>
            </Link>
        </div>
    );
};

export default ProductCard;
