import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { AuthProvider } from "../auth";
import { useEffect, useState } from "react";
import router from "next/router";
import LoadingSpinner from "../components/UI/LoadingSpinner/LoadingSpinner";
import Overlay from "../components/UI/Overlay/Overlay";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; /* eslint-disable import/first */

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    const start = () => {
      setLoading(true);
    }
    const end = () => {
      setLoading(false);
    }

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    }
  }, [])
  return (
    <AuthProvider>
    {loading && <Overlay><LoadingSpinner /></Overlay>}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
