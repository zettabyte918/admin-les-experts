import Head from "next/head";
import { useApi } from "../../axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { HeaderText } from "../../components/layout";
import { TableGroup } from "../../components/table";

function Groupes() {
  const [groups, setGroups] = useState([]);
  const { getAllGroups } = useApi();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      async function fetchData() {
        const Students = await getAllGroups();
        setGroups(Students.data);
      }
      fetchData();
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Groupes</title>
      </Head>
      <HeaderText text={"Liste avec tous les groupes"} />
      <TableGroup datas={groups} />
    </>
  );
}

Groupes.layout = "GlobalLayout";
export default Groupes;
