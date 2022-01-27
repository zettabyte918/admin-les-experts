import React, { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "../components/Notification";

import axios from "axios";

export const strapiApi = createContext();

export const ApiContext = ({ children }) => {
  const { data: session } = useSession();
  const { addNotification } = useNotification();

  const api = axios.create({
    baseURL:
      process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL ||
      "http://localhost:1337/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `bearer ${session?.accessToken}`,
    },
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { response } = error;
      if (response.status == 401 || response.status == 403) {
        return signOut({
          callbackUrl: process.env.NEXT_PUBLIC_ADMIN_AUTH_SIGNIN,
        });
      }
    }
  );

  const addStudent = async (selected, inputValues) => {
    if (!selected)
      return addNotification(
        "DANGER",
        "Pack introuvable",
        "veuillez sélectionner un pack valide"
      );
    const user = {
      ...inputValues,
      pack: selected.id,
    };
    await api.post("/experts-users", JSON.stringify(user));
    return addNotification(
      "SUCCESS",
      "Succès",
      `${user.first_name_student} ajouté avec succès`
    );
  };

  const getAllStudents = async () => {
    return await api.get("/experts-users");
  };

  const getAllGroups = async () => {
    return await api.get("/groupes");
  };

  return (
    <strapiApi.Provider
      value={{ api, addStudent, getAllStudents, getAllGroups }}
    >
      {children}
    </strapiApi.Provider>
  );
};

export function useApi() {
  return useContext(strapiApi);
}
