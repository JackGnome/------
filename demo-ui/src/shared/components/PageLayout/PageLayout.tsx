import React from 'react';
import styles from './PageLayout.module.scss';

export interface IPageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<IPageLayoutProps> = ({ children }) => {
    return <div className={styles.rootWrapper}>{children}</div>;
};

export default PageLayout;
