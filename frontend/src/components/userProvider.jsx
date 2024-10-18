import { createContext, useEffect, useRef, useState } from "react";

export const userContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRol, setUserRol] = useState(null);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        userRol,
        setUserRol,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
