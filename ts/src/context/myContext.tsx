import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ROOTSTORE } from "../redux/store";

export interface Context {
  isLogged: boolean;
  role: string;
  verify: boolean;
  fn: () => void; // Function to update context data
}

interface ContextProps {
  children: ReactNode;
}

export const MyContext = createContext<Context | undefined>(undefined);

export const MyContextProvider: React.FC<ContextProps> = ({ children }) => {
  const reduxData = useSelector((state: ROOTSTORE) => state.signup);

  // Initialize context data using useState
  const [userData, setUserData] = useState<Context>({
    isLogged: reduxData.isLogged,
    role: reduxData.role,
    verify: reduxData.verify,
    fn: () => {
      // Update context data using setUserData function
      setUserData(prevData => ({
        ...prevData,
        isLogged: false,
        role: 'NOTHING',
        verify: false
      }));
    }
  });

  // Update context data when Redux store data changes
  useEffect(() => {
    setUserData({
      isLogged: reduxData.isLogged,
      role: reduxData.role,
      verify: reduxData.verify,
      fn: userData.fn // Keep the existing update function
    });
  }, [reduxData]);

  return (
    <MyContext.Provider value={userData}>
      {children}
    </MyContext.Provider>
  );
};