import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  //state for user logged in
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  //return state(s) to Provider
  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
