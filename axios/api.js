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

  const getStudentById = async (id) => {
    if (id) return await api.get(`/experts-users/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
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

    console.log(data);
    await api.post("/groupes", JSON.stringify(data));
    return addNotification(
      "SUCCESS",
      "Succès",
      `<b>${data.data.nom}</b> a été créé`
    );
  };

  return (
    <strapiApi.Provider
      value={{
        api,
        addStudent,
        getAllStudents,
        getAllGroups,
        getStudentById,
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
