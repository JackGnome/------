import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Footer.module.scss';
import PageContainer from '@/shared/components/PageContainer/PageContainer';
import vkIcon from '@/assets/icons/vk.png';
import messageIcon from '@/assets/icons/message.png';

const Footer: React.FC = () => {
    return (
        <footer className={styles.rootWrapper}>
            <PageContainer>
                <div className={styles.title}>Свяжитесь с нами</div>
                <div className={styles.description}>
                    Если у Вас возникли вопросы, пожелания или предложения, пожалуйста, свяжитесь с нами. Мы всегда
                    открыты для общения и готовы помочь Вам.
                </div>
                <div className={styles.contacts}>
                    <Link href="/" className={styles.icon}>
                        <Image src={vkIcon} alt="vk icon" />
                    </Link>
                    <Link href="/" className={styles.icon}>
                        <Image src={messageIcon} alt="message icon" />
                    </Link>
                </div>
            </PageContainer>
        </footer>
    );
};

export default Footer;
