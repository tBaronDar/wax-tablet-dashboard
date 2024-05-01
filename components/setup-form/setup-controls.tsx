import React from "react";
import { loginHandler } from "@/lib/actions";

import classes from "./setup-controls.module.css";

function SetupControls() {
	return (
		<div className={classes.master}>
			<form action={loginHandler}>
				<p>
					Please Login in order to save your mongoDb credentials and view your
					messages.
				</p>
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default SetupControls;
