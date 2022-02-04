import Head from "next/head";
import { TableEleve } from "../../components/table";
import { useApi } from "../../axios";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { HeaderText } from "../../components/layout";

function Eleves() {
  const [students, setStudents] = useState([]);
  const { getAllStudents } = useApi();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      async function fetchData() {
        const Students = await getAllStudents();
        setStudents(Students.data);
      }
      fetchData();
    }
  }, [session]);

  const TableMemoEleves = useMemo(
    () => <TableEleve datas={students} />,
    [students]
  );
  return (
    <>
      <Head>
        <title>Eleves</title>
      </Head>
      <HeaderText text={"Liste avec tous les élèves"} />
      {TableMemoEleves}
    </>
  );
}

Eleves.layout = "GlobalLayout";
export default Eleves;
