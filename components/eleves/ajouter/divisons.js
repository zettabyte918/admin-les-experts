import { divisions } from "./divisions_attributes";

const Divisions = ({ selectedDivision, handleOnChange }) => {
  return (
    <select
      onChange={handleOnChange}
      value={selectedDivision}
      id="niveau"
      name="niveau"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      {divisions.map((division, id) => (
        <option key={id} value={division.name}>
          {division.name}
        </option>
      ))}
    </select>
  );
};

export { Divisions };
