"use client";

import { useState } from "react";

import classes from "./signup-form.module.css";
import { mongoRegisterNewUser } from "@/lib/mongoDB-handler";

export default function SignupForm() {
	const [userEmail, setUserEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<form className={classes.master} action={mongoRegisterNewUser}>
			<h2>Create your account here: </h2>
			<div>
				<div className={classes.inputs}>
					<label htmlFor="userEmail">User email: </label>
					<input
						placeholder="example@gmail.com"
						id="userEmail"
						name="userEmail"
						type="email"
						required
						value={userEmail}
						onChange={(event) => {
							setUserEmail(event.target.value);
						}}
					/>
				</div>
				<div className={classes.inputs}>
					<label htmlFor="waxPassword">Password: </label>
					<input
						placeholder="******"
						id="waxPassword"
						name="waxPassword"
						type="text"
						minLength={6}
						required
						value={password}
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
				</div>
				<div className={classes.inputs}>
					<label htmlFor="name">Name: </label>
					<input
						placeholder="Joe"
						id="name"
						name="name"
						type="text"
						required
						value={name}
						onChange={(event) => {
							setName(event.target.value);
						}}
					/>
				</div>
			</div>
			<button className={classes.controls} type="submit">
				Register
			</button>
		</form>
	);
}
