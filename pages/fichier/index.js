import axios from "axios";
import { useEffect, useState } from "react";

const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;

const Fichier = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [progress, setProgress] = useState(0);

  const onUploadProgress = (progressEvent) => {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setProgress(percentCompleted);
  };

  const uploadFile = async () => {
    const formData = new FormData();

    if (selectedFile)
      Array.from(selectedFile).map((file) =>
        formData.append("files.files", file, file.name)
      );

    const data = {
      title: "yoooooo",
      description: "mmmmm",
    };

    formData.append("data", JSON.stringify(data));

    axios
      .post(
        `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/attachments/`,
        formData,
        { onUploadProgress }
      )
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

      <div className="w-full bg-gray-200 rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className=" transition-[width] duration-1000 ease-in-out bg-blue-600 transform translate text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-l-full"
        >
          {progress}%
        </div>
      </div>
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

// const uploadFile = async () => {
//   const Files = new FormData();

//   Array.from(selectedFile).map((file) => Files.append("files", file));

//   axios
//     .post(
//       `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/upload/`,
//       Files,
//       config
//     )
//     .then((response) => {
//       response.data.map((res) => alert(JSON.stringify(res)));
//     })
//     .catch((error) => {
//       alert(`${JSON.stringify(error.response.data)}`);
//     });
// };
