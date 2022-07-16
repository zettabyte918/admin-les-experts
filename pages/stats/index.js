import Head from "next/head";
import { useEffect, useState } from "react";
import { Stats } from "../../components/stats";
import { useSession } from "next-auth/react";
import { useApi } from "../../axios";

function Index() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const [unpaidStudents, setUnpaidStudents] = useState([]);

  const { countAllStudents, getAllStudentsPayments } = useApi();

  const getCount = async () => {
    return await countAllStudents();
  };

  const getUnpaidStudents = async () => {
    return await getAllStudentsPayments();
  };

  useEffect(async () => {
    if (session?.accessToken) {
      const c = await getCount();
      const unpaid = await getUnpaidStudents();
      setUnpaidStudents(unpaid.data);
      setCount(c.data);
      console.log("ddd");
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Stats unpaid={unpaidStudents} />
    </>
  );
}

Index.layout = "GlobalLayout";
export default Index;
