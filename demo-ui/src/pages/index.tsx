import catalogPreview from '@/assets/img/catalog-preview.png';
import preview2 from '@/assets/img/preview2.png';
import preview3 from '@/assets/img/preview3.png';
import Footer from '@/shared/components/Footer/Footer';
import HeaderMenu from '@/shared/components/HeaderMenu/HeaderMenu';
import InfoCard from '@/shared/components/InfoCard/InfoCard';
import PageLayout from '@/shared/components/PageLayout/PageLayout';
import PageSection, { PageSectionColor } from '@/shared/components/PageSection/PageSection';
import { NextPage } from 'next';
import React from 'react';
import styles from './index.module.scss';

const IndexPage: NextPage = () => {
    return (
        <PageLayout>
            <HeaderMenu />
            <PageSection />
            <PageSection color={PageSectionColor.GRAY} className={styles.titleSection}>
                <div className={styles.bigTitleWrapper}>
                    <span>Конференц</span>
                    <span className={styles.rightTitle}>системы</span>
                </div>
                <InfoCard
                    title="DJ ОБОРУДОВАНИЕ ДЛЯ ДИСКОТЕК И КЛУБОВ"
                    description="DJ оборудование для клубов - важнейший аспект на пути к качественному звуку
                    и его обработке. За свою историю уровень оборудования совершенствовался и эволюционировал,
                    и сейчас мы можем предложить нашим клиентам профессиональные инструменты,
                    предоставляющие огромный спектр возможностей для работы со звуком."
                    link=""
                    preview={catalogPreview}
                />

                <InfoCard
                    title="ГДЕ ИСПОЛЬЗУЕТСЯ DJ ОБОРУДОВАНИЕ?"
                    description="Создаете ли вы свой клуб, занимаетесь организацией звукового сопровождения концертных
                    мероприятий или же просто работаете над созданием музыки в домашних условиях – DJ оборудование
                    будет являться для вас одним из самых актуальных инструментов, способных участвовать в самых
                    смелых музыкальных фантазиях и экспериментах."
                    link=""
                    preview={preview2}
                />

                <InfoCard
                    title="Какие варианты оборудования предлагаем мы"
                    description="Наш каталог включает десятки позиций современного DJ оборудования высочайшего класса
                    от лучших мировых брендов, таких как Denon, Numark, Allen & Heath, Gemini, Vestax, Stanton,
                    Pioneer и других, работающих над созданием продукции десятки лет. Вы также можете встретить самые
                    последние новинки оборудования любого типа, будь то Dj контроллеры или Dj CD проигрыватели, Dj
                    микшеры или Dj рабочие станции. Все инструменты и аксессуары, представленные в нашем каталоге,
                    гарантируется превосходным качеством и надежностью от производителя."
                    link=""
                    preview={preview3}
                />
            </PageSection>
            <Footer />
        </PageLayout>
    );
};

export default IndexPage;
