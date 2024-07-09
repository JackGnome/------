import React from 'react';
import classNames from 'classnames';
import styles from './PageContainer.module.scss';

export interface IPageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PageContainer: React.FC<IPageContainerProps> = ({ children, className }) => {
    return <div className={classNames(styles.rootWrapper, className)}>{children}</div>;
};

export default PageContainer;
