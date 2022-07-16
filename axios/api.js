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

  const addStudent = async (
    selectedPack,
    selectedGroup,
    inputValues,
    dateRange
  ) => {
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
      pack: selectedPack,
      group: selectedGroup,
      dateRange,
    };
    const response = await api.post("/experts-users", JSON.stringify(user));
    if (response.status === 200) {
      console.log(response.data.id);
      addNotification(
        "SUCCESS",
        "Succès",
        `<b>${user.first_name_student}</b> ajouté avec succès`
      );
      return router.push(`/eleves/imprimer/${response.data.id}`);
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves?error=invalide_id_ajout");
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

  const deactivateStudentById = async (id) => {
    if (id) {
      const response = await api.get(`/experts-users/deactivate/${id}`);
      const { status } = response;
      console.log(response);
      if (status === 200) {
        addNotification(
          "SUCCESS",
          "Succès ",
          "Élève <b>désactivé</b> avec succès"
        );
        return router.push(`/eleves`);
      }
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push(`/eleves/editer/${id}`);
  };

  const updateStudentById = async (user) => {
    if (!user?.pack)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>pack</b> est obligatoire`
      );
    if (!user?.groupe)
      return addNotification(
        "DANGER",
        "Mauvais format",
        `le champ du <b>group</b> est obligatoire`
      );

    if (user?.id) {
      const response = await api.put(
        `/experts-users/${user.id}`,
        JSON.stringify(user)
      );
      if (response.status === 200)
        addNotification(
          "SUCCESS",
          "Succès",
          `mise à jour de <b>${response.data.name_eleve}</b> est réussie`
        );
      return router.push("/eleves");
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves?error=invalide_id_update");
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
    addNotification("SUCCESS", "Succès", `<b>${data.data.nom}</b> a été créé`);
    return router.push("/groupes?groupeAdded=true");
  };

  const getAllGroups = async () => {
    return await api.get("/groupes");
  };

  const getAllPayments = async (id) => {
    if (id) return await api.get(`/experts-users/payments/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const getAllStudentsPayments = async (id) => {
    const response = await api.get(`/experts-users/payments`);
    if (response) return response;
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/");
  };

  const deletePaymentById = async (id) => {
    if (id) {
      const response = await api.delete(`/payments/${id}`);
      if (response.status === 200) {
        return router.reload(window.location.pathname);
      }
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/eleves");
  };

  const addPayment = async (startDate, endDate, id) => {
    if (!startDate || !endDate || !id) return;

    const data = {
      data: {
        debut: startDate,
        fin: endDate,
        student: id,
      },
    };
    console.log(data);
    const response = await api.post(
      `/payments/addpayment`,
      JSON.stringify(data)
    );
    if (response.status === 200) {
      return router.reload(window.location.pathname);
    }
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
  };

  const getGroupById = async (id) => {
    if (id) return await api.get(`/groupes/${id}`);
    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/groupes");
  };

  const updateGroupById = async (group) => {
    if (!group?.id) {
      addNotification(
        "DANGER",
        "Une erreur s'est produite",
        "merci de rafraichir cette page"
      );
      return router.push("/eleves?error=invalide_id_update");
    }

    const data = {
      data: {
        ...group,
      },
    };

    const response = await api.put(
      `/groupes/${group.id}`,
      JSON.stringify(data)
    );

    if (response.status === 200) {
      addNotification(
        "SUCCESS",
        "Succès",
        `mise à jour de <b>${response.data.data.attributes.nom}</b> est réussie`
      );
      return router.push("/groupes");
    }

    addNotification(
      "DANGER",
      "Une erreur s'est produite",
      "merci de rafraichir cette page"
    );
    return router.push("/groupes?error=invalide_id_update");
  };

  return (
    <strapiApi.Provider
      value={{
        api,
        countAllStudents,
        addStudent,
        getAllStudents,
        getStudentById,

        deactivateStudentById,
        updateStudentById,

        getAllGroups,
        addGroup,
        getGroupById,
        updateGroupById,

        getAllPayments,
        addPayment,
        deletePaymentById,
        getAllStudentsPayments,
      }}
    >
      {children}
    </strapiApi.Provider>
  );
};

export function useApi() {
  return useContext(strapiApi);
}
