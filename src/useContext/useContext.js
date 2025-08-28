import { useContext } from "react";
import { Context } from "../context/context.jsx";

export const useAuth = () => {
  const { isLoggedIn, userName, setUserName, setLoggedIn, loading } =
    useContext(Context);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName("");
    localStorage.removeItem("logged"); // opcional, si manejas sesión en localStorage
  };

  const setName = (newUserName) => {
    setUserName(newUserName);
  };

  return {
    userName,
    isLoggedIn,
    loading,
    setName,
    handleLogin,
    handleLogout,
  };
};
