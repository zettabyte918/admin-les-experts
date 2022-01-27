import Link from "next/link";
import male from "../../../public/sexe/male-student.png";

export const COLUMNS = [
  {
    Header: "Nom",
    accessor: "nom",
  },
  {
    Header: "Description",
    accessor: "description",
  },
  {
    Header: "Eleves",
    accessor: ({ students }) => {
      return students.map((student) => student.name_eleve);
    },
    Cell: ({ value }) => {
      return value.map((name_eleve, id) => (
        <span
          key={id}
          className="inline-flex items-center mr-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          {name_eleve}
        </span>
      ));
    },
  },
];
