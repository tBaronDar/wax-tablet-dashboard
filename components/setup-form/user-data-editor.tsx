"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
	dropdownSelector,
	getCreds,
	readJsonData,
	writeJsonFile,
} from "@/lib/config-editor";
import Dropdown from "./dropdown";

function UserDataEditor({
	nameInput,
	usernameInput,
	passwordInput,
	defDatabaseInput,
}) {
	const { data: session, status } = useSession();
	const [name, setName] = useState(nameInput);

	const [username, setUsername] = useState(usernameInput);
	const [password, setPassword] = useState(passwordInput);
	const [showEditor, setShowEditor] = useState(false);

	function toggleEditorHandler() {
		setShowEditor(!showEditor);
	}

	console.log("run form");
	return (
		<div>
			{nameInput && <h1>{`Welcome back ${name}`}</h1>}
			{nameInput && username !== "" && password !== "" && (
				<div>
					<p>
						{`The current used username is: `}
						<strong>{username}</strong>
					</p>
					<p>
						{`The current used password is: `}
						<strong>{password}</strong>
					</p>
					<p>
						{`The default database is: `}
						<strong>{defDatabaseInput}</strong>
					</p>
					<form>
						<button type="submit">Connect</button>
					</form>
				</div>
			)}
			{showEditor && (
				<form action={getCreds}>
					<h1>Setup your database here</h1>
					<div>
						<div>
							<label htmlFor="username">Username</label>
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
							<label htmlFor="password">Password</label>
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
			<button onClick={toggleEditorHandler}>Edit data</button>
		</div>
	);
}

export default UserDataEditor;
