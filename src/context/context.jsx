import {createContext, useState } from "react";

export const Context = createContext(
    {
        token: "",
        username: "",
        setToken: () => {},
        setUsername: () => {}
    }
);


export const ContextProvider = (props) => {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    return (
        <Context.Provider value={{token, username, setToken, setUsername}}>
            {props.children}
        </Context.Provider>
    );
};
