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

  function changeCredentialsHandler() {
    context.getCredentials("", "");
    setUsername("");
    setPassword("");
  }

  function dropdownHandler() {}

  return (
    <section>
      <h1>Setup your database</h1>
      <form onSubmit={submitHandler}>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              value={username}
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
              value={password}
              id="password"
              type="text"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="dropdown">
          <button onClick={dropdownHandler} className="dropbtn">
            Dropdown
          </button>
          <div id="myDropdown" className="dropdown-content">
            {/* {context.<a href="#">Link 1</a>} */}
          </div>
        </div>
        <button type="submit">Send</button>
        <button type="button" onClick={changeCredentialsHandler}>
          Change
        </button>
      </form>
    </section>
  );
}

export default SetupForm;
