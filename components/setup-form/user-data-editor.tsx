import { connectHandler } from "@/lib/actions";
import SaveDataForm from "./save-data-form";

import classes from "./user-data-editor.module.css";

function UserDataEditor({
  nameInput,
  usernameInput,
  passwordInput,
  collectionInput,
  defDatabaseInput,
}) {
  const showConnect =
    usernameInput !== "not set" && passwordInput !== "not set";

  return (
    <div className={classes.master}>
      {nameInput && <h1>{`Welcome back ${nameInput}`}</h1>}
      {nameInput && usernameInput !== "" && passwordInput !== "" && (
        <div>
          <p>
            {`The current used username is: `}
            <strong>{usernameInput}</strong>
          </p>
          <p>
            {`The current used password is: `}
            <strong>{passwordInput}</strong>
          </p>
          <p>
            {`The default collection is: `}
            <strong>{collectionInput}</strong>
          </p>
          <p>
            {`The default database is: `}
            <strong>{defDatabaseInput}</strong>
          </p>
          <h3>
            Click connect to see messages or edit data to enter your MongoDb
            credentials :
          </h3>
          {showConnect && (
            <form action={connectHandler} className={classes.controls}>
              <button type="submit">Connect</button>
            </form>
          )}
        </div>
      )}
      <SaveDataForm
        usernameInput={usernameInput}
        passwordInput={passwordInput}
        collectionInput={collectionInput}
        defDatabaseInput={defDatabaseInput}
      />
    </div>
  );
}

export default UserDataEditor;
