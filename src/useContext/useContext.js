import { useContext } from "react";
import { Context } from "../context/context.jsx";

export const useAuth = () => {
  const { token, username, setToken, setUsername } = useContext(Context);

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const getUsername = () => {
    return username;
  };

  const getToken = () => {
    return token;
  }


  return {
    updateUsername,
    updateToken,
    getUsername,
    getToken,
  };
};

