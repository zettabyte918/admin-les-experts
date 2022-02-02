import Head from "next/head";
import { useEffect, useState } from "react";
import { Stats } from "../components/stats";
import { useSession } from "next-auth/react";
import { useApi } from "../axios";

function Index() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const { countAllStudents } = useApi();
  const getCount = async () => {
    return await countAllStudents();
  };
  useEffect(async () => {
    if (session?.accessToken) {
      const c = await getCount();
      setCount(c.data);
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Stats count={count} />
    </>
  );
}

Index.layout = "GlobalLayout";
export default Index;
