import Head from "next/head";
import { Stats } from "../components/stats";

function index() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Stats />
    </>
  );
}

index.layout = "GlobalLayout";

export default index;
