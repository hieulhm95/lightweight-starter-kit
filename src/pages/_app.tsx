import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import NextNProgress from '~/components/ProgressBar/ProgressBar';
import config from '~/config';
import { wrapper } from '~/store';
import 'clad-ui/css/baseline';
import type { NextPage } from 'next';
import type { AppContext, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: Record<string, any>) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, ...rest }: AppPropsWithLayout) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  const page = <Component {...pageProps} />;

  return (
    <>
      <Head>
        <title>{config.app.title}</title>
        {config.app.head.meta.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <meta {...item} />
        ))}
      </Head>
      <NextNProgress />
      <Provider store={store}>{getLayout(page, pageProps)}</Provider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { ctx } = appContext;
  const isSSR = !!ctx.req;

  return {
    pageProps: {
      isSSR,
      ...appProps.pageProps,
    },
  };
};

export default MyApp;
