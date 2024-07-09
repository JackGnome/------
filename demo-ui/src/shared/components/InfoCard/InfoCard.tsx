import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import styles from './InfoCard.module.scss';

interface IInfoCardProps {
    title: string;
    description: string;
    link: string;
    preview: StaticImageData | string;
}

const InfoCard: React.FC<IInfoCardProps> = ({ title, description, link, preview }: IInfoCardProps) => {
    return (
        <div className={styles.rootWrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
            <Link className={styles.link} href={link}>
                Посмореть
            </Link>
            <Image src={preview} className={styles.preview} alt="preview img" />
        </div>
    );
};

export default InfoCard;
