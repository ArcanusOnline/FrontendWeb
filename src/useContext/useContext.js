import { useContext } from "react";
import { Context } from "../context/context.jsx";

export const useAuth = () => {
  const { isLoggedIn, userName, setUserName, setLoggedIn } =
    useContext(Context);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const setName = (newUserName) => {
    setUserName(newUserName);
  };

  return {
    userName,
    isLoggedIn,
    setName,
    handleLogin,
    handleLogout,
  };
};
