import { createContext, useState, useEffect } from "react";
import { checkAuth } from "../querys/scripts";

export const Context = createContext({
  userName: "",
  isLoggedIn: false,
  loading: true,
  setLoggedIn: () => {},
  setUserName: () => {},
});

export const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await checkAuth();
        console.log(res);
        if (res.valid) {
          setLoggedIn(true);
          setUserName(res.username || "");
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
      {props.children}
    </Context.Provider>
  );
};
