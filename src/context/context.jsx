import { createContext, useState, useEffect } from "react";
import { checkAuth } from "../querys/scripts";

export const Context = createContext({
  userName: "",
  isLoggedIn: false,
  loading: true,
  setLoggedIn: () => {},
  setUserName: () => {},
});

export const ContextProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        // Llamamos siempre al backend para verificar cookie httpOnly
        const urlBase = "/api";
        // const urlBase = import.meta.env.VITE_API_URL;
        const res = await fetch(`${urlBase}/checkAuth`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setLoggedIn(false);
          setUserName("");
          return;
        }

        const data = await res.json();
        if (data.valid) {
          setLoggedIn(true);
          setUserName(data.user || "");
        } else {
          setLoggedIn(false);
          setUserName("");
        }
      } catch (error) {
        console.error("Error en verifyAuth:", error);
        setLoggedIn(false);
        setUserName("");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, []);

  return (
    <Context.Provider
      value={{ isLoggedIn, userName, loading, setUserName, setLoggedIn }}
    >
      {children}
    </Context.Provider>
  );
};
