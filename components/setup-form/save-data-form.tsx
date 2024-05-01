"use client";

import React, { useState } from "react";
import { getCreds } from "@/lib/config-editor";
import { useSession } from "next-auth/react";

import classes from "./save-data-form.module.css";
import { logoutHandler } from "@/lib/actions";

function SaveDataForm({ usernameInput, passwordInput }) {
	const { data: session } = useSession();
	const [username, setUsername] = useState(usernameInput);
	const [password, setPassword] = useState(passwordInput);

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
				<form action={getCreds}>
					<h2>Setup your database here: </h2>
					<div>
						<div>
							<label htmlFor="username">Username: </label>
							<input
								placeholder="Enter the new username"
								id="username"
								name="username"
								type="text"
								value={username}
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="password">Password: </label>
							<input
								placeholder="Enter the new password"
								id="password"
								name="password"
								type="text"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
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
