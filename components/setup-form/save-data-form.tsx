"use client";

import React, { useState } from "react";
import { getCreds } from "@/lib/config-editor";
import { useSession } from "next-auth/react";

import { logoutHandler } from "@/lib/actions";

import classes from "./save-data-form.module.css";

function SaveDataForm({
  usernameInput,
  passwordInput,
  collectionInput,
  defDatabaseInput,
}) {
  const { data: session } = useSession();

  const [username, setUsername] = useState(usernameInput);
  const [password, setPassword] = useState(passwordInput);
  const [collection, setCollection] = useState(collectionInput);
  const [defDatabase, setDefDatabase] = useState(defDatabaseInput);

  const [showEditor, setShowEditor] = useState(false);

  function toggleEditorHandler() {
    setShowEditor(!showEditor);
  }

  let buttonLabel: string;
  !showEditor ? (buttonLabel = "Edit data") : (buttonLabel = "Close editor");

  return (
    <div className={classes.master}>
      <button onClick={toggleEditorHandler}>{buttonLabel}</button>
      <p>Click to change the mongoDb credentials</p>
      {showEditor && (
        <form action={getCreds.bind(null, session.user.email)}>
          <h2>Setup your database here: </h2>
          <h3>
            Don't change the collection and/or the database unless you know what
            you are doing.
          </h3>
          <h3>More info in the about page.</h3>
          <div>
            <div className={classes.inputs}>
              <label htmlFor="username">Username: </label>
              <input
                placeholder="Enter the MongoDb username"
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className={classes.inputs}>
              <label htmlFor="password">Password: </label>
              <input
                placeholder="Enter the MongoDb password"
                id="password"
                name="password"
                type="text"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className={classes.inputs}>
              <label htmlFor="collection">Collection: </label>
              <input
                id="collection"
                name="collection"
                type="text"
                value={collection}
                onChange={(event) => {
                  setCollection(event.target.value);
                }}
              />
            </div>
            <div className={classes.inputs}>
              <label htmlFor="defDatabase">Default Database </label>
              <input
                id="defDatabase"
                name="defDatabase"
                type="text"
                value={defDatabase}
                onChange={(event) => {
                  setDefDatabase(event.target.value);
                }}
              />
            </div>
          </div>
          <button type="submit">Save</button>
        </form>
      )}
      {session && (
        <form className={classes.logout} action={logoutHandler}>
          <button type="submit">Logout</button>
        </form>
      )}
    </div>
  );
}

export default SaveDataForm;
