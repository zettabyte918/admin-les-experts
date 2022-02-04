import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useApi } from "../../../axios";
import { RadioGroup } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Packs = ({ selected, setSelected }) => {
  const [packs, setPack] = useState([]);

  const { data: session } = useSession();
  const { api } = useApi();

  const fetchPacks = async () => {
    const pa = await api.get("/packs");
    setPack(pa.data.data);
  };
  useEffect(async () => {
    if (session?.accessToken) {
      await fetchPacks();
    }
  }, [session]);
  return (
    <RadioGroup value={selected} onChange={setSelected}>
      <RadioGroup.Label className="sr-only">packs</RadioGroup.Label>
      <div className="bg-white rounded-md -space-y-px">
        {packs?.map((pack, id) => (
          <RadioGroup.Option
            key={id}
            value={pack.id}
            className={({ checked }) =>
              classNames(
                id === 0 ? "rounded-tl-md rounded-tr-md" : "",
                id === packs.length - 1 ? "rounded-bl-md rounded-br-md" : "",
                checked
                  ? "bg-indigo-50 border-indigo-200 z-10"
                  : "border-gray-200",
                "relative border p-4 flex cursor-pointer focus:outline-none"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <span
                  className={classNames(
                    checked
                      ? "bg-indigo-600 border-transparent"
                      : "bg-white border-gray-300",
                    active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
                    "h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
                  )}
                  aria-hidden="true"
                >
                  <span className="rounded-full bg-white w-1.5 h-1.5" />
                </span>
                <div className="ml-3 flex flex-col">
                  <RadioGroup.Label
                    as="span"
                    className={classNames(
                      checked ? "text-indigo-900" : "text-gray-900",
                      "block text-sm font-medium"
                    )}
                  >
                    {pack.attributes.nom}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className={classNames(
                      checked ? "text-indigo-700" : "text-gray-500",
                      "block text-sm"
                    )}
                  >
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                      {pack.attributes.description}
                    </span>
                  </RadioGroup.Description>
                </div>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export { Packs };
