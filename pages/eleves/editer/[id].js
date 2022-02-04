import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useReducer, useMemo, useEffect } from "react";
import { ArrowLeftIcon, PrinterIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useApi } from "../../../axios";
import { Packs, Divisions } from "../../../components/eleves/ajouter";
import { HeaderText } from "../../../components/layout";
import { Groupes } from "../../../components/eleves/ajouter/groupes";

const AjouterEleve = () => {
  const { getStudentById, updateStudentById } = useApi();
  const router = useRouter();
  const { id } = router.query;

  const [student, setStudent] = useState({});
  const [selectedPack, setSelectedPack] = useState();
  const [selectedGroup, setSelectedGroup] = useState();

  const packs = useMemo(
    () => <Packs selected={selectedPack} setSelected={setSelectedPack} />,
    [selectedPack]
  );

  const groupes = useMemo(
    () => <Groupes selected={selectedGroup} setSelected={setSelectedGroup} />,
    [selectedGroup]
  );

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {}
  );
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  const updateStudent = async () => {
    return updateStudentById({
      id,
      groupe: selectedGroup,
      pack: selectedPack,
      ...inputValues,
    });
  };

  useEffect(() => {
    if (id) {
      const updateStudent = async () => {
        const student = await getStudentById(id);
        setStudent(student);
        setSelectedPack(student.data.pack.id);
        setSelectedGroup(student.data.groupe.id);
      };
      updateStudent();
    }
  }, [id]);
  return (
    <>
      <Head>
        <title>Ajouter un élève</title>
      </Head>
      <HeaderText text={"Modifier cet élève"} />
      <div className="flex py-2 justify-between">
        <Link href="/eleves">
          <a
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Retour
          </a>
        </Link>
        <Link href={`/eleves/imprimer/${id}`}>
          <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Imprimer
            <PrinterIcon className="ml-1 h-5 w-5" aria-hidden="true" />
          </a>
        </Link>
      </div>
      <div className=" relative flex-1 ">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className=" md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name_parent"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom complet des parents
                      </label>
                      <input
                        onChange={handleOnChange}
                        type="text"
                        defaultValue={student?.data?.name_parent || ""}
                        name="name_parent"
                        id="name_parent"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name_eleve"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nom complet de l&apos;élève
                      </label>
                      <input
                        onChange={handleOnChange}
                        defaultValue={student?.data?.name_eleve || ""}
                        type="text"
                        name="name_eleve"
                        id="name_eleve"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6">
                      <div>
                        <label
                          htmlFor="subjects"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Les matières demandées
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            defaultValue={student?.data?.subjects || ""}
                            id="subjects"
                            name="subjects"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="math - anglais ..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les matières requises pour cet étudiant.
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        onChange={handleOnChange}
                        defaultValue={student?.data?.email || ""}
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Numéro téléphone
                      </label>
                      <input
                        onChange={handleOnChange}
                        defaultValue={student?.data?.tel || ""}
                        type="number"
                        name="tel"
                        id="tel"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="niveau"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Niveau
                      </label>
                      <Divisions
                        selectedDivision={student?.data?.niveau || ""}
                        handleOnChange={handleOnChange}
                      />
                    </div>

                    <div className="col-span-6">
                      <div>
                        <label
                          htmlFor="remarque_parents"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remarque des parents
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            defaultValue={student?.data?.remarque_parents || ""}
                            id="remarque_parents"
                            name="remarque_parents"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="des remarques..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les remarques des parents requises pour cet étudiant.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div>
                        <label
                          htmlFor="remarque_center"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Remarque du center
                        </label>
                        <div className="mt-1">
                          <textarea
                            onChange={handleOnChange}
                            defaultValue={student?.data?.remarque_center || ""}
                            id="remarque_center"
                            name="remarque_center"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="des remarques..."
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          les remarques du center requises pour cet étudiant.
                        </p>
                      </div>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Pack
                        </label>
                        <div className="mt-1">{packs}</div>
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Groupe
                        </label>
                        <div className="mt-1">{groupes}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-3 bg-gray-200 text-right sm:px-6">
                  <button
                    type="button"
                    onClick={updateStudent}
                    className="inline-flex w-full md:w-fit justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

AjouterEleve.layout = "GlobalLayout";
export default AjouterEleve;
