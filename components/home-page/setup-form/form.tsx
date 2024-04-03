"use client";

import { getData } from "@/lib/get-formdata";
import Dropdown from "./dropdown";

function SetupForm({ username, password, collections, databases }) {
  return (
    <section>
      <h1>Setup your database</h1>
      <form action={getData}>
        <div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              defaultValue={password}
            />
          </div>
        </div>
        <Dropdown>
          {collections.map((name: string) => {
            return <p key={name}>{name}</p>;
          })}
        </Dropdown>
        <Dropdown>
          {databases.map((name: string) => {
            return <p key={name}>{name}</p>;
          })}
        </Dropdown>
        <button type="submit">Send</button>
        <button type="button">Change</button>
      </form>
    </section>
  );
}

export default SetupForm;
