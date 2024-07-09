import React from 'react';
import classNames from 'classnames';
import PageContainer from '@/shared/components/PageContainer/PageContainer';
import styles from './PageSection.module.scss';

export enum PageSectionColor {
    TRANSPARENT,
    GRAY,
    BLACK,
}

const colors = new Map<PageSectionColor, string>([
    [PageSectionColor.TRANSPARENT, styles.transparentBackground],
    [PageSectionColor.GRAY, styles.grayBackground],
    [PageSectionColor.BLACK, styles.blackBackground],
]);

export interface IPageSectionProps {
    children?: React.ReactNode;
    color?: PageSectionColor;
    className?: string;
}

const PageSection: React.FC<IPageSectionProps> = ({ children, className, color = PageSectionColor.TRANSPARENT }) => {
    return (
        <div className={classNames(styles.rootWrapper, colors.get(color), className)}>
            <PageContainer>{children}</PageContainer>
        </div>
    );
};

export default PageSection;
