import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/assets/icons/logo.jpg';
import PageContainer from '@/shared/components/PageContainer/PageContainer';
import styles from './HeaderMenu.module.scss';

const HeaderMenu: React.FC = () => {
    return (
        <PageContainer className={styles.rootWrapper}>
            <Link href="/" className={styles.logoWrapper}>
                <Image src={logoImg} alt="djarena logo" className={styles.logo} />
            </Link>
            <div className={styles.menu}>
                <Link href="/catalog" className={styles.menuOption}>
                    Каталог
                </Link>
                <Link href="/" className={styles.menuOption}>
                    Новости
                </Link>
                <Link href="/" className={styles.menuOption}>
                    Оплата
                </Link>
                <Link href="/" className={styles.menuOption}>
                    Доставка
                </Link>
                <Link href="/" className={styles.menuOption}>
                    Контакты
                </Link>
            </div>
        </PageContainer>
    );
};

export default HeaderMenu;
