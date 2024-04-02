"use client";
import { useState } from "react";

import { getData } from "@/lib/get-formdata";
import { readJsonData } from "@/lib/get-file-data";

function SetupForm({ setupData }) {
  function dropdownHandler() {}

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
              value={setupData.username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              value={setupData.password}
            />
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div id="myDropdown" className="dropdown-content">
            {/* {context.<a href="#">Link 1</a>} */}
          </div>
        </div>
        <button type="submit">Send</button>
        <button type="button">Change</button>
      </form>
    </section>
  );
}

export default SetupForm;
