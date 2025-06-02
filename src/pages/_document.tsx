/* eslint-disable react/no-danger */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import React from 'react';
import config from '~/config';

const MyDocument = () => {
  return (
    <Html lang="vi">
      <Head>
        <link rel="shortcut icon" href="https://www.chotot.com/chotot-img/favicon.ico" />
      </Head>
      <body>
        <Main />
        <script
          dangerouslySetInnerHTML={{
            __html: Object.entries(config.universalEnv).reduce(
              (html, [name, value]) => html + `window.${name}='${value}';`,
              ''
            ),
          }}
        />
        <NextScript />
      </body>
    </Html>
  );
};

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const initialProps = await Document.getInitialProps(ctx);

  return initialProps;
};

export default MyDocument;
