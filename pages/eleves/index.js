import Head from "next/head";
import { EmptyStateEleves } from "../../components/eleves";

function Eleves() {
  return (
    <>
      <Head>
        <title>Eleves</title>
      </Head>
      <EmptyStateEleves />
    </>
  );
}

Eleves.layout = "GlobalLayout";
export default Eleves;
