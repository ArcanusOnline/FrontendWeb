import { useContext } from "react";
import { Context } from "../context/context.jsx";

export const useAuth = () => {
  const { token, username, loading, setToken, setUsername, setLoading } =
    useContext(Context);

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
  };

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const updateLoading = (prevState) => {
    setLoading(!prevState);
  };

  const getUsername = () => {
    return username;
  };

  const getToken = () => {
    return token;
  };

  const getLoading = () => {
    return loading;
  };

  return {
    updateUsername,
    updateToken,
    updateLoading,
    getUsername,
    getToken,
    getLoading,
  };
};
