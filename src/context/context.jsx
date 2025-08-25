import { createContext, useState } from "react";

export const Context = createContext({
  userName: "",
  isLoggedIn: false,
  setLoggedIn: () => {},
  setUserName: () => {},
});

export const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Context.Provider
      value={{ isLoggedIn, userName, setUserName, setLoggedIn }}
    >
      {props.children}
    </Context.Provider>
  );
};
