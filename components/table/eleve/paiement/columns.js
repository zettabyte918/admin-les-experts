export const COLUMNS = [
  {
    Header: "Mois",
    accessor: (payment) =>
      new Date(payment?.debut).toLocaleString("fr-FR", {
        month: "long",
        year: "numeric",
      }),
    Cell: ({ value }) => {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
          {value}
        </span>
      );
    },
  },
  {
    Header: "Debut",
    accessor: "debut",
  },
  {
    Header: "Fin",
    accessor: "fin",
  },
];
