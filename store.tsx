"use client";
import { createContext, useState } from "react";

const ServerContext = createContext({
  username: "",
  password: "",
  collections: ["messages"],
  getCredentials: (username: string, password: string) => {},
  getCollections: (collections: string[]) => {},
  getDatabases: (database: string[]) => {},
});

export default ServerContext;

export function ServerContextProvider({ children }) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [collections, setCollections] = useState([]);
  const [databases, setDatabases] = useState([]);

  function getInputs(username: string, password: string) {
    setPassword(password);
    setUsername(username);
  }

  function getMongodbCollections(collections: any[]) {
    setCollections(collections);
  }

  function getMongodbDatabases(dbs: any[]) {
    setDatabases(dbs);
  }

  const context = {
    username: username,
    password: password,
    collections: collections,
    getCredentials: getInputs,
    getCollections: getMongodbCollections,
    getDatabases: getMongodbDatabases,
  };

  return (
    <ServerContext.Provider value={context}>{children}</ServerContext.Provider>
  );
}
