import Head from "next/head";
import { EmptyStateEleves, TableEleves } from "../../components/eleves";

function Eleves() {
  let users = true;
  if (!users)
    return (
      <>
        <Head>
          <title>Eleves</title>
        </Head>
        <EmptyStateEleves />
      </>
    );
  return (
    <>
      <Head>
        <title>Eleves</title>
      </Head>
      <TableEleves />
    </>
  );
}

Eleves.layout = "GlobalLayout";
export default Eleves;
