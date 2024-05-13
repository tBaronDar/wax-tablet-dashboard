import React from "react";
import { loginHandler, signupHandler } from "@/lib/actions";

import classes from "./setup-controls.module.css";

function SetupControls() {
  return (
    <div className={classes.master}>
      <form action={loginHandler} className={classes.items}>
        <p>
          Please Login in order to save your mongoDb credentials and view your
          messages.
        </p>
        <button type="submit">Login</button>
      </form>
      <form action={signupHandler} className={classes.items}>
        <p>
          If you don't have an account or you can't login with Google or create
          an account here:
        </p>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SetupControls;
