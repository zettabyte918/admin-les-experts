import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import { useApi } from "../../../axios";
import { useSession } from "next-auth/react";
import Logo from "../../../public/logo2.png";
import { Transition } from "@headlessui/react";
import { PrinterIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import Head from "next/head";

const people = [
  {
    name: "1",
    title: "1",
    role: "1",
    email: "1",
    email2: "1",
  },
];

const Imprimer = () => {
  const router = useRouter();
  const [studentData, setStudentData] = useState(false);
  const [ready, setReady] = useState(false);

  const { id } = router.query;
  const { data: session } = useSession();
  const { getStudentById } = useApi();

  const printPage = () => {
    window.print();
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString("en-GB");
  };

  useEffect(() => {
    if (session?.accessToken) {
      const fetchUser = async () => {
        const std = await getStudentById(id);
        setStudentData(std?.data);
        setReady(true);
      };
      fetchUser();
    }
    return () => {
      setStudentData(false);
    };
  }, [session]);

  return (
    <>
      <Head>
        <title>{studentData?.name_eleve} || LES EXPERTS</title>
      </Head>
      <div className="flex py-2 justify-center space-x-2 items-center">
        <img width={100} src={Logo.src}></img>
        <div className="text-center">
          <h1 className=" text-4xl font-bold text-red-500">LES EXPERTS</h1>
          <h2 className="text-gray-500">CENTER D&apos;ASSISTANCE SCOLAIRE</h2>
        </div>
      </div>
      <div className="py-5"></div>
      <Transition
        appear={true}
        show={ready}
        as={Fragment}
        enter="transform ease-out duration-500 transition"
        enterFrom="-translate-y-2 opacity-0"
        enterTo="translate-y-0 opacity-100"
      >
        <div className="print:hidden fixed top-3 space-x-2 left-0 flex justify-end px-10 shadow-sm">
          <div className="">
            <Link href="/eleves">
              <a
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ArrowLeftIcon
                  className="-ml-1 mr-2 h-5 w-5"
                  aria-hidden="true"
                />
                Retour
              </a>
            </Link>
          </div>

          <button
            type="button"
            onClick={printPage}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PrinterIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Imprimer cet élève
          </button>
        </div>
      </Transition>
      <div className="print:hidden py-5"></div>
      <div className="px-10 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="last_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Nom complet de L&apos;élève
          </label>
          <input
            type="text"
            name="last_name_parents"
            id="last_name_parents"
            defaultValue={studentData?.name_eleve}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
          <p className="mt-2 text-sm text-gray-500">
            Créé à {formatDate(studentData?.createdAt)}
          </p>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="first_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Nom complet des parents
          </label>
          <input
            type="text"
            name="first_name_parents"
            id="first_name_parents"
            defaultValue={studentData?.name_parent}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="first_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Nom d&apos;utilisateur
          </label>
          <input
            type="text"
            name="first_name_parents"
            id="first_name_parents"
            defaultValue={studentData?.username}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="first_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            name="first_name_parents"
            id="first_name_parents"
            defaultValue={studentData?.email}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="first_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Remarque des parents
          </label>
          <div className="mt-1">
            <textarea
              id="subjects"
              name="subjects"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
              defaultValue={studentData?.remarque_parents}
            />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="first_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Remarque du center
          </label>
          <div className="mt-1">
            <textarea
              id="subjects"
              name="subjects"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
              defaultValue={studentData?.remarque_center}
            />
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="last_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Numéro de téléphone
          </label>
          <input
            type="text"
            name="last_name_parents"
            id="last_name_parents"
            defaultValue={studentData?.tel}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="last_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Niveau scolaire
          </label>
          <input
            type="text"
            name="last_name_parents"
            id="last_name_parents"
            defaultValue={studentData?.niveau}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-6">
          <label
            htmlFor="first_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Les matières demandées
          </label>
          <div className="mt-1">
            <textarea
              id="subjects"
              name="subjects"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-2 border-gray-300 rounded-md"
              defaultValue={studentData?.subjects}
            />
            <p className="mt-2 text-sm text-gray-500">
              Les matières nécessaire pour ce pack
            </p>
          </div>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="last_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Pack
          </label>
          <input
            type="text"
            name="last_name_parents"
            id="last_name_parents"
            defaultValue={studentData?.pack?.nom}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
          <p className="mt-2 text-sm text-gray-500">
            {studentData?.pack?.description}
          </p>
        </div>
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="last_name_parents"
            className="block text-sm font-medium text-gray-700"
          >
            Groupe
          </label>
          <input
            type="text"
            name="last_name_parents"
            id="last_name_parents"
            defaultValue={studentData?.groupe?.nom}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-2 border-gray-300 rounded-md"
          />
          <p className="mt-2 text-sm text-gray-500">
            {studentData?.groupe?.description}
          </p>
        </div>
        <div className="col-span-6">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-400">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    1
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    2
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    3
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    4
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    5
                  </th>
                </tr>
              </thead>
              <tbody>
                {people.map((person, personIdx) => (
                  <tr
                    key={person.email}
                    className={personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {person.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {person.email2}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="py-5"></div>
    </>
  );
};

export default Imprimer;
