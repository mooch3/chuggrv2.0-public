import CallToAction from "../components/Home/CallToAction";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>CHUGGR</title>
        <meta
          name="description"
          content="CHUGGR is a social media and drinking app that allows you to 'bet' drinks on events, moneylines, and spreads"
        />
        <meta
          name="keywords"
          content="CHUGGR, Bet, Betting, Social, Drinking"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
      </Head>
      <CallToAction />
    </>
  );
}
