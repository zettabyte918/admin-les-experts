import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "../../components/Notification";
import { useRouter } from "next/router";

import axios from "axios";

export const SmsGlobalState = createContext();

export const SmsContext = ({ children }) => {
  // const router = useRouter();
  const { data: session } = useSession();
  const { addNotification } = useNotification();

  // orange api token
  const [token, setToken] = useState(null);

  // sms orange api balance (available unit)
  const [balance, setBalance] = useState(0);

  // sms send button default to true
  const [canSend, setCanSend] = useState(true);

  // state that have all students
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInputQuery, setSearchInputQuery] = useState("");
  const [received, setReceived] = useState([]);

  const getTokenSMS = async () => {
    var config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_STRAPI_BACKEND_API_URL}/sms/token`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    };

    return await axios(config);
  };

  const getBalance = async () => {
    var config = {
      method: "get",
      url: "https://api.orange.com/sms/admin/v1/contracts",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await axios(config);
  };

  const sendSMS = async (students, message) => {
    var config = {
      method: "post",
      url: "https://api.orange.com/smsmessaging/v1/outbound/tel:+21627515642/requests",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (students.length > 0) {
      students.map((student, i) => {
        if (!isNaN(student.tel)) {
          setTimeout(async () => {
            let response = await axios({
              ...config,
              data: {
                outboundSMSMessageRequest: {
                  address: `tel:+216${student.tel}`,
                  senderAddress: `tel:+21627515642`,
                  senderName: "LES EXPERTS",
                  outboundSMSTextMessage: {
                    message,
                  },
                },
              },
            });

            if (response?.status === 201) {
              setReceived((prev) => [...prev, student]);
            }
          }, 1000 * i);
        }
      });
    }
  };

  useEffect(() => {
    // initiate filtred students with current all students as the first state
    setFilteredStudents(students);
  }, [students]);
  return (
    <SmsGlobalState.Provider
      value={{
        students,
        setStudents,
        selectedStudents,
        setSelectedStudents,
        filteredStudents,
        setFilteredStudents,
        searchInputQuery,
        setSearchInputQuery,
        token,
        setToken,
        balance,
        setBalance,
        canSend,
        setCanSend,
        getTokenSMS,
        getBalance,
        sendSMS,
        received,
      }}
    >
      {children}
    </SmsGlobalState.Provider>
  );
};

export function useSMSApi() {
  return useContext(SmsGlobalState);
}
