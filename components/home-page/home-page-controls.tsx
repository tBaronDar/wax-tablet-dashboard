import React from "react";
import { signOut } from "next-auth/react";

import classes from "./home-page-controls.module.css";

function HomePageControls({ refresher }) {
	return (
		<div className={classes.controls}>
			<form action={refresher}>
				<button type="submit">Refresh</button>
			</form>
			<form
				action={async () => {
					"use server";
					signOut;
				}}>
				<button type="submit">Log out</button>
			</form>
		</div>
	);
}

export default HomePageControls;
