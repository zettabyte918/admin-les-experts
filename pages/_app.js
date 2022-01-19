import "../styles/globals.css";
import { Fragment } from "react";
import { GlobalLayout } from "../components/layout";

const layouts = {
  GlobalLayout,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component?.layout] || Fragment;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
