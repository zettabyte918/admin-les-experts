import React, { createContext, useContext } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "../components/Notification";
import { useRouter } from "next/router";

import axios from "axios";

export const strapiApi = createContext();

export const ApiContext = ({ children }) => {
  const router = useRouter();
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
      try {
        const { response } = error;
        if (response.status == 401 || response.status == 403) {
          return signOut({
            callbackUrl: process.env.NEXT_PUBLIC_ADMIN_AUTH_SIGNIN,
          });
        }
      } catch {
        return signOut({
          callbackUrl: process.env.NEXT_PUBLIC_ADMIN_AUTH_SIGNIN,
        });
      }
    }
  );

  const addStudent = async (selectedPack, selectedGroup, inputValues) => {
    if (!selectedPack)
      return addNotification(
        "DANGER",
        "Pack introuvable",
        "veuillez sélectionner un <b>pack</b> valide"
      );

    if (!selectedGroup)
      return addNotification(
        "DANGER",
        "Pack introuvable",
        "veuillez sélectionner un <b>groupe</b> valide"
      );
    const user = {
      ...inputValues,
      pack: selectedPack.id,
      group: selectedGroup.id,
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

  const getStudentById = async (id) => {
    if (id) return await api.get(`/experts-users/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const countAllStudents = async () => {
    return await api.get("/experts-users/count");
  };

  const addGroup = async (inputValues) => {
    if (!inputValues.nom)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>nom</b> est obligatoire`
      );
    if (!inputValues.description)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>description</b> est obligatoire`
      );

    const data = {
      data: {
        ...inputValues,
      },
    };

    await api.post("/groupes", JSON.stringify(data));
    return addNotification(
      "SUCCESS",
      "Succès",
      `<b>${data.data.nom}</b> a été créé`
    );
  };

  const getAllGroups = async () => {
    return await api.get("/groupes");
  };

  return (
    <strapiApi.Provider
      value={{
        api,
        addStudent,
        getAllStudents,
        getAllGroups,
        getStudentById,
        countAllStudents,
        addGroup,
      }}
    >
      {children}
    </strapiApi.Provider>
  );
};

export function useApi() {
  return useContext(strapiApi);
}
