import React from "react";

import classes from "./home-page-controls.module.css";
import { connectHandler, logoutHandler } from "@/lib/actions";

function HomePageControls() {
	return (
		<div className={classes.controls}>
			<form action={connectHandler}>
				<button type="submit">Refresh</button>
			</form>
			<form action={logoutHandler}>
				<button type="submit">Log out</button>
			</form>
		</div>
	);
}

export default HomePageControls;
