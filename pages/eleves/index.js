import Head from "next/head";
import { EmptyStateEleves, TableEleves } from "../../components/eleves";
import { useUserRegistration } from "../../components/slides/userRegistration/context";
import { PlusIcon } from "@heroicons/react/solid";
import { useSession, signOut } from "next-auth/react";

const people = [
  {
    name: "Hossem Hammami",
    title: "Bac scientifique",
    department: "informatique",
    role: "Etudiant",
    email: "hossem.cold@gmail.com",
    image: "",
  },
  // More people...
];

function Eleves() {
  const { setOpen } = useUserRegistration();
  const { data: session, status } = useSession();
  let users = true;
  if (!users)
    return (
      <>
        <Head>
          <title>Eleves</title>
        </Head>
        <EmptyStateEleves />
      </>
    );
  return (
    <>
      <Head>
        <title>Eleves</title>
      </Head>
      <div className="flex py-2 justify-end">
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              setOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Nouvel étudiant
          </button>
        </div>
      </div>
      <TableEleves people={people} />
    </>
  );
}

Eleves.layout = "GlobalLayout";
export default Eleves;
