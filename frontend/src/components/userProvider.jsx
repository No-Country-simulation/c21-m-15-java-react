import { is } from "date-fns/locale";
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
