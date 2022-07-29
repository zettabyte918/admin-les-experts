import Head from "next/head";
import { useEffect, useState } from "react";
import { Stats } from "../../components/stats";
import { useGlobalContext } from "../../context/global";

function Index() {
  const { students, unpaidStudents } = useGlobalContext();

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Stats count={students.length} unpaid={unpaidStudents} />
    </>
  );
}

Index.layout = "GlobalLayout";
export default Index;
