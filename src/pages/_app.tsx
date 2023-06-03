import Head from "next/head";
import { Router } from "next/router";
import type { AppProps } from "next/app";
import ProgressBar from "@badrap/bar-of-progress";

import "@/styles/globals.css";

const progress = new ProgressBar({
  size: 4,
  color: "#329a9a",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Hostshare</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
