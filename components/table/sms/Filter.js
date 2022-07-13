import { useState } from "react";
import { division } from "./division";
import MyCombobox from "./combobox-devision";
import Search from "./search-input";

const Filter = ({ datas }) => {
  const [selected, setSelected] = useState(division[0]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row py-2 justify-between">
        <div className="flex z-10 flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Search />
          <MyCombobox
            division={division}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </div>
    </>
  );
};

Filter.displayName = "Filter";
export { Filter };
