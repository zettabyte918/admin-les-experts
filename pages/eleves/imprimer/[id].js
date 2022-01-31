// @refresh reset

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useApi } from "../../../axios";
import { useSession } from "next-auth/react";

const Imprimer = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(!!null);
  const { id } = router.query;
  const { data: session } = useSession();
  const { getStudentById } = useApi();

  const printPage = () => {
    window.print();
  };
  useEffect(() => {
    if (session?.accessToken) {
      const fetchUser = async () => {
        const std = await getStudentById(id);
        setStudentData(std?.data);
      };
      fetchUser();
    }
  }, [session]);

  return studentData ? (
    <>
      <div className="bg-blue-800 h-20 flex justify-center items-center">
        <span className="text-gray-50 font-mono font-black bg-blue-700 p-2 rounded-md text-4xl hover:bg-blue-900">
          LES EXPERTS
        </span>
      </div>
      <div className="pt-4 grid grid-cols-2 gap-2">
        <div>Name: {studentData?.username}</div>
        <div></div>
      </div>
      <button
        onClick={printPage}
        className=" print:hidden p-2 bg-blue-800 text-"
      >
        imprimer
      </button>
    </>
  ) : null;
};

export default Imprimer;
