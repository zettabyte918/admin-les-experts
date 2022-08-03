import axios from "axios";
import { useEffect, useState } from "react";

const bytesToMegaBytes = (bytes) => bytes / 1024 ** 2;

const config = {
  onUploadProgress: function (progressEvent) {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(percentCompleted);
  },
};

const Fichier = () => {
  const [selectedFile, setSelectedFile] = useState([]);

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
        config
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
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <div className="max-w-lg flex justify-center bg-white px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
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
