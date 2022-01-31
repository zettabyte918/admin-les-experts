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
      return (
        <span className="inline-flex items-center mr-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800">
          {value.length}
        </span>
      );
    },
  },
];
