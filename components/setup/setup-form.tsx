"use client";
import ServerContext from "@/store";
import { useContext, useState } from "react";

function SetupForm() {
  const context = useContext(ServerContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(event: any) {
    event.preventDefault();

    // Validation

    context.getCredentials(username, password);
  }

  return (
    <section>
      <h1>Setup your database</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default SetupForm;
