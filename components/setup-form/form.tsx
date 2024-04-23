"use client";

import { useState } from "react";
import {
	dropdownSelector,
	getCreds,
	readJsonData,
	writeJsonFile,
} from "@/lib/config-editor";
import Dropdown from "./dropdown";

function SetupForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showEditor, setShowEditor] = useState(true);

	function toggleEditorHandler() {
		setShowEditor(!showEditor);
	}

	async function collectionSelectHandler(name: string) {
		//setSelectedCollection(name);
		await dropdownSelector("collection", name);
	}

	async function databaseSelectHandler(name: string) {
		//setSelectedDatabase(name);
		await dropdownSelector("database", name);
	}

	console.log("run form");
	return (
		<form action={getCreds}>
			<h1>Setup your database</h1>
			<div>
				{showEditor && (
					<div>
						<div>
							<label htmlFor="username">Username</label>
							<input
								placeholder="Enter your username"
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
								placeholder="Enter your password"
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
				)}
				<button type="submit">Connect</button>
				<button onClick={toggleEditorHandler}>Edit data</button>
			</div>

			{/* <Dropdown selectedValue={selectedDatabase}>
				{databases.map((name: string) => {
					return (
						<p key={name} onClick={databaseSelectHandler.bind(null, name)}>
							{name}
						</p>
					);
				})}
			</Dropdown> */}
		</form>
	);
}

export default SetupForm;
