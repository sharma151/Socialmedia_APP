import { useState, createContext } from "react";

export const UsernameContext = createContext();

export const Setusername = ({ children }) => {
  const [UserName, SetUserName] = useState("");

  return (
    <UsernameContext.Provider value={{ UserName, SetUserName }}>
      {children}
    </UsernameContext.Provider>
  );
};
