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
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  return (
    <Context.Provider
      value={{ token, username, loading, setToken, setUsername, setLoading }}
    >
      {children}
    </Context.Provider>
  );
};
