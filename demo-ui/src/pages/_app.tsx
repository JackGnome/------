import { wrapper } from '@/store/store';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import ruRu from 'antd/locale/ru_RU';
import { ConfigProvider } from 'antd';

import '@/shared/styles/styles.scss';

const MyApp: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <Provider store={store}>
            <ConfigProvider locale={ruRu}>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...props.pageProps} />
            </ConfigProvider>
        </Provider>
    );
};

export default MyApp;
