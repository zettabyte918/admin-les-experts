import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "../../components/Notification";
import axios from "axios";

const GlobalContextConfig = (accessToken) => {
  return {
    baseURL:
      process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL ||
      "http://localhost:1337/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
};

export const GlobalContext = createContext();

export const GlobalContextWrapper = ({ children }) => {
  // const router = useRouter();
  const { data: session } = useSession();
  const { addNotification } = useNotification();
  const [fetched, setFetched] = useState(false);
  //students
  const [students, setStudents] = useState([]);
  const [studentsPayments, setStudentsPayments] = useState([]);
  const [unpaidStudents, setUnpaidStudents] = useState([]);

  const [packs, setPacks] = useState([]);
  const [groupes, setGroupes] = useState([]);

  const { accessToken } = session || {};
  const request = axios.create(GlobalContextConfig(accessToken));

  const getAllStudents = async () => {
    return await request.get("/experts-users").catch(function (error) {
      addNotification(
        "DANGER",
        "Une erreur s'est produite",
        "Erreur lors de la récupération des élèves"
      );
    });
  };

  const getAllStudentsPayments = async () => {
    return await request.get("/experts-users/payments").catch(function (error) {
      addNotification(
        "DANGER",
        "Une erreur s'est produite",
        "Erreur lors de la récupération les payments des élèves"
      );
    });
  };

  const getAllUnpaidStudents = () => {
    let dateNowMs = new Date().getTime();
    let unpaid = studentsPayments.map((student) => {
      if (student.payments.length) {
        let paymentsOldThanNow = student.payments.map((payment) =>
          new Date(payment.fin).getTime()
        );
        let maxDateFin = new Date(Math.max(...paymentsOldThanNow));
        if (maxDateFin < dateNowMs) {
          setUnpaidStudents((prev) => [...prev, student]);
        }
      } else {
        setUnpaidStudents((prev) => [...prev, student]);
      }
    });
  };

  const getAllPacks = async () => {
    return await request.get("/packs").catch(function (error) {
      addNotification(
        "DANGER",
        "Une erreur s'est produite",
        "Erreur lors de la récupération des packs"
      );
    });
  };

  const getAllGroupes = async () => {
    return await request.get("/groupes").catch(function (error) {
      addNotification(
        "DANGER",
        "Une erreur s'est produite",
        "Erreur lors de la récupération des groupes"
      );
    });
  };

  useEffect(() => {
    request.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }, [session]);

  useEffect(async () => {
    if (accessToken && !fetched) {
      const response1 = await getAllStudents();
      const response2 = await getAllStudentsPayments();
      const response3 = await getAllPacks();
      const response4 = await getAllGroupes();
      setStudents(response1.data);
      setStudentsPayments(response2.data);
      setPacks(response3.data);
      setGroupes(response4.data);
      setFetched(true);
    }
  }, [session]);

  useEffect(() => {
    if (studentsPayments) getAllUnpaidStudents();
  }, [studentsPayments]);

  console.log("hehehehehe");
  return (
    <GlobalContext.Provider
      value={{
        students,
        studentsPayments,
        unpaidStudents,
        setStudents,
        packs,
        setPacks,
        groupes,
        setGroupes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
