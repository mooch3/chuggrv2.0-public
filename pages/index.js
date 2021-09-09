import CallToAction from "../components/Home/CallToAction";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>CHUGGR</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="google-site-verification"
          content="edXPc_aS1os_T4Y5gr7YCb027etWhr3RYOQf5fSj9JI"
        />
        <meta
          name="description"
          content="CHUGGR is a social media and drinking app that allows you to 'bet' drinks on events, moneylines, and spreads"
        />
        <meta
          name="keywords"
          content="CHUGGR, Bet, Betting, Social, Drinking"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.ico" />
        <meta property="og:title" content="CHUGGR">
          <meta property="og:site_name" content="chuggr.io" />
          <meta property="og:url" content="https://chuggr.io/" />
          <meta
            property="og:description"
            content="A social media and sports betting application."
          />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="/CHUGGRLogoSM.png" />
        </meta>
      </Head>
      <CallToAction />
    </>
  );
}
