import "../styles/globals.css";
import { Fragment } from "react";
import { SessionProvider } from "next-auth/react";
import { GlobalLayout } from "../components/layout";
import { UserRegistration } from "../components/slides";
import { UserRegistrationProvide } from "../components/slides/userRegistration/context";

const layouts = {
  GlobalLayout,
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = layouts[Component?.layout] || Fragment;
  return (
    <SessionProvider session={session}>
      <UserRegistrationProvide>
        <Layout>
          <Component {...pageProps} />
          <UserRegistration />
        </Layout>
      </UserRegistrationProvide>
    </SessionProvider>
  );
}

export default MyApp;
