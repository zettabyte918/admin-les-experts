import axios from "axios";
import { useEffect, useState } from "react";

const Fichier = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadFile = () => {
    const Files = new FormData();

    Files.append("files", selectedFile[0]);
    Files.append("files", selectedFile[1]);

    console.log(selectedFile);
    axios
      .post(`${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/upload/`, Files)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <form>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files)}
        name="files"
        multiple
      />
      <input
        type="button"
        onClick={uploadFile}
        className=" cursor-pointer bg-slate-600 p-2 rounded-md text-xs text-gray-50"
        value="Upload"
      />
    </form>
  );
};

Fichier.layout = "GlobalLayout";
export default Fichier;
