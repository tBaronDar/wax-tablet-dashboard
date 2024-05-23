"use client";

import React, { useEffect, useState } from "react";

import { logoutHandler } from "@/lib/actions";

import classes from "./save-data-form.module.css";
import { mongoFindUser, mongoUpdateUserProfile } from "@/lib/mongoDB-handler";

function SaveDataForm(props) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [collection, setCollection] = useState("");
	const [database, setDatabase] = useState("");

	useEffect(() => {
		async function profileGettter() {
			const userProfile = await mongoFindUser(props.email);
			setUsername(userProfile.username);
			setPassword(userProfile.password);
			setCollection(userProfile.collection);
			setDatabase(userProfile.database);
		}
		profileGettter();
	}, []);

	const [showEditor, setShowEditor] = useState(false);

	function toggleEditorHandler() {
		setShowEditor(!showEditor);
	}

	async function userProfileDataHandler(formData: FormData) {
		const usernameInput = formData.get("username").toString();
		const passwordInput = formData.get("password").toString();
		const collectionInput = formData.get("collection").toString();
		const databaseInput = formData.get("database").toString();

		const dataInput = {
			usernameInput,
			passwordInput,
			collectionInput,
			databaseInput,
		};
		await mongoUpdateUserProfile(props.email, dataInput);
	}

	let buttonLabel: string;
	!showEditor ? (buttonLabel = "Edit data") : (buttonLabel = "Close editor");
	//console.log(session.user.email);

	return (
		<div className={classes.master}>
			<button onClick={toggleEditorHandler}>{buttonLabel}</button>
			<p>Click to change the mongoDb credentials</p>

			{showEditor && (
				<form action={userProfileDataHandler}>
					<h2>Setup your database here: </h2>
					<h3>
						Don&apos;t change the collection and/or the database unless you know
						what you are doing.
					</h3>
					<h3>More info in the about page.</h3>
					<div>
						<div className={classes.inputs}>
							<label htmlFor="username">Username: </label>
							<input
								placeholder="Enter the MongoDb username"
								id="username"
								name="username"
								type="text"
								value={username}
								onChange={(event) => {
									setUsername(event.target.value);
								}}
							/>
						</div>
						<div className={classes.inputs}>
							<label htmlFor="password">Password: </label>
							<input
								placeholder="Enter the MongoDb password"
								id="password"
								name="password"
								type="text"
								value={password}
								onChange={(event) => {
									setPassword(event.target.value);
								}}
							/>
						</div>

						<div className={classes.inputs}>
							<label htmlFor="collection">Collection: </label>
							<input
								id="collection"
								name="collection"
								type="text"
								value={collection}
								onChange={(event) => {
									setCollection(event.target.value);
								}}
							/>
						</div>
						<div className={classes.inputs}>
							<label htmlFor="database">Database: </label>
							<input
								id="database"
								name="database"
								type="text"
								value={database}
								onChange={(event) => {
									setDatabase(event.target.value);
								}}
							/>
						</div>
					</div>
					<button type="submit">Save</button>
				</form>
			)}

			<form className={classes.logout} action={logoutHandler}>
				<button type="submit">Logout</button>
			</form>
		</div>
	);
}

export default SaveDataForm;
