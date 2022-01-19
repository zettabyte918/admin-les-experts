import Head from "next/head";
import { EmptyStateGroupes } from "../../components/groupes";

function Groupes() {
  return (
    <>
      <Head>
        <title>Groupes</title>
      </Head>
      <EmptyStateGroupes />
    </>
  );
}

Groupes.layout = "GlobalLayout";
export default Groupes;
