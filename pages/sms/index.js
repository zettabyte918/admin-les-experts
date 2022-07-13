//you can find this il strapi backend within experts-users controller "getTokenSMS"

import Head from "next/head";
import { useApi } from "../../axios";
import { useEffect, useState } from "react";
import { ChatAlt2Icon } from "@heroicons/react/outline";
import { Filter, TableEleveSMS } from "../../components/table";

const SmsPage = () => {
  const { getTokenSMS, getBalance, getAllStudents } = useApi();

  // orange api token
  const [token, setToken] = useState(null);

  // sms orange api balance (available unit)
  const [balance, setBalance] = useState(0);

  // sms send button default to true
  const [canSend, setCanSend] = useState(true);

  // state where al the student with the filtred student
  const [students, setStudents] = useState({
    students: [],
    filtered: [],
  });

  // get token from les-experts backend
  const getToken = async () => {
    return await getTokenSMS();
  };

  // get token from les-expert backend
  useEffect(async () => {
    const response = await getToken();
    setToken(response.data.access_token);
  }, []);

  //get balance and all student from les-experts backend
  useEffect(async () => {
    if (token) {
      const response = await getBalance(`${token}`);
      const students = await getAllStudents();

      if (response.code === 41) {
        return;
      }
      setStudents({
        all: students.data,
        filtered: students.data,
      });
      setBalance(response.data.partnerContracts.contracts[0].serviceContracts);
    }
  }, [token]);

  //if students are ready log the results for now
  useEffect(() => {
    if (students?.all) {
      console.log(students.all[0].tel);
    }
  }, [students]);

  return (
    <>
      <Head>
        <title>Messagerie</title>
      </Head>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Messagerie</h1>
          <p className="mt-2 text-sm text-gray-700">
            Envoyer des messages sms courts aux groupes, niveau (7e, 8e...) ou à
            tous les élèves.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <SendButton canSend={canSend} />
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <Filter />
        <TableEleveSMS students={students.students} />
      </div>
    </>
  );
};

SmsPage.layout = "GlobalLayout";
export default SmsPage;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SendButton = ({ canSend }) => {
  return (
    <button
      // onMouseOver={() => alert("hii")}
      disabled={canSend}
      type="button"
      className={classNames(
        canSend
          ? "bg-gray-300 focus:ring-gray-300"
          : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
        "inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2  focus:ring-offset-2 sm:w-auto"
      )}
    >
      Envoyer
      <ChatAlt2Icon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </button>
  );
};
