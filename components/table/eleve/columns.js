import Link from "next/link";
import male from "../../../public/sexe/male-student.png";
import { PencilAltIcon } from "@heroicons/react/outline";

export const COLUMNS = [
  {
    Header: "Nom et prénom",
    accessor: (student) => [student.name_eleve, student.email],
    Cell: ({ value }) => {
      const [name_eleve, email] = value;
      return (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={male.src} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {name_eleve}
            </div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      );
    },
  },
  {
    Header: "Niveau",
    accessor: "niveau",
  },
  {
    Header: "Groupe",
    accessor: (student) => [student?.groupe?.nom, student?.groupe?.description],
    Cell: ({ value }) => {
      const [nom, description] = value;
      const [mot1, mot2, mot3] = description.split(" ");
      return (
        <>
          <div className="text-sm font-medium text-gray-900">{nom}</div>
          <span
            title={description}
            className="inline-flex items-center truncate text-clip w-full px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
          >
            {`${mot1} ${mot2} ${mot3}...`}
          </span>
        </>
      );
    },
  },
  // {
  //   Header: "Statut",
  //   accessor: "confirmed",
  //   Cell: ({ value }) => {
  //     return (
  //       <>
  //         {value ? (
  //           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
  //             confirmé
  //           </span>
  //         ) : (
  //           <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
  //             pas confirmé
  //           </span>
  //         )}
  //       </>
  //     );
  //   },
  // },
  {
    Header: "Pack",
    accessor: (student) => [student?.pack?.nom, student?.pack?.description],
    Cell: ({ value }) => {
      const [nom, description] = value;

      return (
        <>
          <div className="text-sm font-medium text-gray-900">{nom}</div>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
            {description}
          </span>
        </>
      );
    },
  },
  {
    Header: "",
    accessor: "id",
    Cell: ({ value }) => {
      return (
        <div className="flex items-center space-x-1">
          {/* <Link href={`/eleves/imprimer/${value}`}>
            <a className="text-indigo-600 hover:text-indigo-900">Imprimer</a>
          </Link> */}
          <Link href={`/eleves/editer/${value}`}>
            <a className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Éditer
              <PencilAltIcon className="ml-1 h-5 w-5" aria-hidden="true" />
            </a>
          </Link>
        </div>
      );
    },
  },
];
