export default function Search() {
  return (
    <div>
      <div className="relative flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="rechercher"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400">
            Global
          </kbd>
        </div>
      </div>
    </div>
  );
}
