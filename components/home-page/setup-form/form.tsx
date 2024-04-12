"use client";

import { useState } from "react";
import { getData } from "@/lib/get-formdata";
import Dropdown from "./dropdown";

function SetupForm({ username, password, collections, databases }) {
	const [selectedCollection, setSelectedCollection] = useState("Select one");
	const [selectedDatabase, setSelectedDatabase] = useState("Select one");

	function collectionSelectHandler(name: string) {
		setSelectedCollection(name);
	}

	function databaseSelectHandler(name: string) {
		setSelectedDatabase(name);
	}

	return (
		<section>
			<h1>Setup your database</h1>
			<form action={getData}>
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
				//collection dropdown list
				<Dropdown selectedValue={selectedCollection}>
					{collections.map((name: string) => {
						return (
							<p key={name} onClick={collectionSelectHandler.bind(null, name)}>
								{name}
							</p>
						);
					})}
				</Dropdown>
				//database dropdown list
				<Dropdown selectedValue={selectedDatabase}>
					{databases.map((name: string) => {
						return (
							<p key={name} onClick={databaseSelectHandler.bind(null, name)}>
								{name}
							</p>
						);
					})}
				</Dropdown>
				<button type="submit">Send</button>
				<button type="button">Change</button>
			</form>
		</section>
	);
}

export default SetupForm;
