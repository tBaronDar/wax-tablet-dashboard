"use client";

import { useState } from "react";
import { dropdownSelector, getCreds } from "@/lib/config-editor";
import Dropdown from "./dropdown";

function SetupForm({ username, password, collections, databases }) {
	const [selectedCollection, setSelectedCollection] = useState("Select one");
	const [selectedDatabase, setSelectedDatabase] = useState("Select one");

	async function collectionSelectHandler(name: string) {
		setSelectedCollection(name);
		await dropdownSelector("collection", name);
	}

	async function databaseSelectHandler(name: string) {
		setSelectedDatabase(name);
		await dropdownSelector("database", name);
	}

	console.log("run form");

	return (
		<>
			<h1>Setup your database</h1>
			<form action={getCreds}>
				<div>
					<div>
						<label htmlFor="username">Username</label>
						<input
							id="username"
							name="username"
							type="text"
							defaultValue={username}
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							name="password"
							type="text"
							defaultValue={password}
						/>
					</div>
				</div>

				<Dropdown selectedValue={selectedCollection}>
					{collections.map((name: string) => {
						return (
							<p key={name} onClick={collectionSelectHandler.bind(null, name)}>
								{name}
							</p>
						);
					})}
				</Dropdown>

				<Dropdown selectedValue={selectedDatabase}>
					{databases.map((name: string) => {
						return (
							<p key={name} onClick={databaseSelectHandler.bind(null, name)}>
								{name}
							</p>
						);
					})}
				</Dropdown>
				<button type="submit">Connect</button>
				<button type="button">Change</button>
			</form>
		</>
	);
}

export default SetupForm;
