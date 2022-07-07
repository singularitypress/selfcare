import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";

import "../styles/index.scss";

export default ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Self Care</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/ios/512.png"></link>
        <meta name="theme-color" content="#252627" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
