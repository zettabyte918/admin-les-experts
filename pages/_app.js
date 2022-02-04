import "../styles/globals.css";
import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import { GlobalLayout } from "../components/layout";
import { NotificationProvider, Notification } from "../components/Notification";
import { ApiContext } from "../axios";

const layouts = {
  GlobalLayout,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = layouts[Component?.layout] || Fragment;
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <Notification />
        <ApiContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApiContext>
      </NotificationProvider>
    </SessionProvider>
  );
}

export default MyApp;
