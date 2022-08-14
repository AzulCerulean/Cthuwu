import { createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  //state for user logged in

  //fetch user logging in

  //return it to Provider
  return (
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  )
}
