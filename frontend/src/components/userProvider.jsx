import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenFromStorage = sessionStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);

      fetch("http://localhost:8080/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenFromStorage}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener el usuario");
          }
          return response.json();
        })
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          setToken(null);
          sessionStorage.removeItem("token");
          setUser(null);
          console.error(error);
        });
    }
  }, []);

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
