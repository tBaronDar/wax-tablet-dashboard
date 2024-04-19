"use client";

import { useEffect, useState } from "react";
import {
	dropdownSelector,
	getCreds,
	readJsonData,
	writeJsonFile,
} from "@/lib/config-editor";
import Dropdown from "./dropdown";

function SetupForm({ username, password, databases, collections }) {
	const [selectedDatabase, setSelectedDatabase] = useState(
		databases[0] || "No database"
	);
	const [selectedCollection, setSelectedCollection] = useState(
		collections[0] || "No collection"
	);

	const [usedDatabases, setUsedDatabases] = useState(databases);

	useEffect(() => {
		async function get() {
			const configData = await readJsonData();
			writeJsonFile({
				...configData,
				username,
				password,
				databases,
			});
		}
		get();
	}, [username, password]);

	async function collectionSelectHandler(name: string) {
		setSelectedCollection(name);
		await dropdownSelector("collection", name);
	}

	async function databaseSelectHandler(name: string) {
		setSelectedDatabase(name);
		await dropdownSelector("database", name);
	}

	function purgeHandler() {
		writeJsonFile({
			username: "",
			password: "",
			defDatabase: "admin",
			database: "",
			collection: "",
			databases: [],
			collections: [],
		});
		setSelectedCollection("");
		setSelectedDatabase("");
	}

	console.log("run form");
	return (
		<form action={getCreds}>
			<h1>Setup your database</h1>
			<div>
				<div>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						defaultValue={username || "Enter username"}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						id="password"
						name="password"
						type="text"
						defaultValue={password || "Enter password"}
					/>
				</div>
				<button type="submit">Connect</button>
			</div>

			<Dropdown selectedValue={selectedDatabase}>
				{databases.map((name: string) => {
					return (
						<p key={name} onClick={databaseSelectHandler.bind(null, name)}>
							{name}
						</p>
					);
				})}
			</Dropdown>

			{
				<Dropdown selectedValue={selectedCollection}>
					{collections.map((name: string) => {
						return (
							<p key={name} onClick={collectionSelectHandler.bind(null, name)}>
								{name}
							</p>
						);
					})}
				</Dropdown>
			}

			<button onClick={purgeHandler}>Purge Credentials</button>
		</form>
	);
}

export default SetupForm;
