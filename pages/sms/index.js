//you can find this il strapi backend within experts-users controller "getTokenSMS"

import Head from "next/head";
import { HeaderText } from "../../components/layout";
import { useApi } from "../../axios";
import { useEffect, useState } from "react";

const SmsPage = () => {
  const { getTokenSMS, getBalance } = useApi();
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(null);

  const getToken = async () => {
    return await getTokenSMS();
  };
  useEffect(async () => {
    const response = await getToken();
    setToken(response.data.access_token);
  }, []);

  useEffect(async () => {
    if (token) {
      const response = await getBalance(`${token}`);
      console.log(response);
      if (response.code === 41) {
        return;
      }
      setBalance(response.data.partnerContracts.contracts[0].serviceContracts);
    }
  }, [token]);
  return (
    <>
      <Head>
        <title>Send sms</title>
      </Head>
      <HeaderText text={"Gerer les messages"} />
      <span className="text-2xl text-indigo-500">
        {token ? token : "loading..."}
      </span>
      <br />
      <span className="text-2xl text-indigo-500">
        {balance ? balance[0].availableUnits : "loading..."}
      </span>
      <br />
      <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        show available units
      </button>
    </>
  );
};

SmsPage.layout = "GlobalLayout";
export default SmsPage;
