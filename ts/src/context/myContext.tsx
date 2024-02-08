// myContext.tsx
import React, { createContext, ReactNode } from "react";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";

export interface Context {
  isLogged: boolean | any;
  role: String;
  verify: boolean;
}

interface ContextProps {
  children: ReactNode;
}

export const MyContext = createContext<Context | undefined>(undefined);

export const MyContextProvider: React.FC<ContextProps> = ({ children }) => {
  const data = useSelector((state: ROOTSTORE) => state.signup);

  // Initialize your context data here
  const userData = {
    isLogged: data.isLogged,
    role: data.role,
    verify: data.verify,
    fn: () => {
        userData.isLogged = false;
        userData.role = 'NOTHING';
        userData.verify = false;
    }
};



  return <MyContext.Provider value={userData} >{children}</MyContext.Provider>;
};
