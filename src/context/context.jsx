import { createContext, useState, useEffect } from "react";

export const Context = createContext({
  token: "",
  username: "",
  loading: false,
  setToken: () => {},
  setUsername: () => {},
  setLoading: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || "",
  );
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{ token, username, loading, setToken, setUsername, setLoading }}
    >
      {children}
    </Context.Provider>
  );
};
