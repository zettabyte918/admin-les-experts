import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useNotification } from "../../components/Notification";
import { useRouter } from "next/router";

import axios from "axios";

export const SmsGlobalState = createContext();

export const SmsContext = ({ children }) => {
  // const router = useRouter();
  // const { data: session } = useSession();
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

  useEffect(() => {
    setFilteredStudents(students);
    console.log(`testing ${students.length}`);
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
      }}
    >
      {children}
    </SmsGlobalState.Provider>
  );
};

export function useSMSApi() {
  return useContext(SmsGlobalState);
}
