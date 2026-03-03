import { useContext } from "react";
import { Context } from "../context/context.jsx";

export const useAuth = () => {
  const { token, username, loading, setToken, setUsername, setLoading } =
    useContext(Context);

  const login = (newToken, newUsername) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newUsername);
    setToken(newToken);
    setUsername(newUsername);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken("");
    setUsername("");
  };

  return { token, username, loading, setLoading, login, logout };
};
