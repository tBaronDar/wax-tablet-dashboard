"use client";
import { createContext, useState } from "react";

const ServerContext = createContext({
  username: null,
  password: null,
  getCredentials: (username: string, password: string) => {},
});

export default ServerContext;

export function ServerContextProvider({ children }) {
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);

  function getInputs(username: string, password: string) {
    setPassword(password);
    setUsername(username);
  }

  const context = {
    username: username,
    password: password,
    getCredentials: getInputs,
  };

  return (
    <ServerContext.Provider value={context}>{children}</ServerContext.Provider>
  );
}
