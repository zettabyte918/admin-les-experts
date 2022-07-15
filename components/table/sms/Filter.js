import { useMemo, useState } from "react";
import { division } from "./division";
import MyCombobox from "./combobox-devision";
import Search from "./search-input";
import { useSMSApi } from "../../../context/sms";

const Filter = () => {
  const { students, setStudents } = useSMSApi();
  const div = useMemo(() => division, []);
  const [selected, setSelected] = useState(div[0]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row py-2 justify-between">
        <div className="flex z-10 flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <Search students={students} setStudents={setStudents} />
          {/* to do soon :) */}
          {/* <MyCombobox
            students={students}
            setStudents={setStudents}
            division={div}
            selected={selected}
            setSelected={setSelected}
          /> */}
        </div>
      </div>
    </>
  );
};

Filter.displayName = "Filter";
export { Filter };
