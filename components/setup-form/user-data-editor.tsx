import { mongoCollectionsGetter } from "@/lib/mongoDB-handler";
import SaveDataForm from "./save-data-form";
import { redirect } from "next/navigation";

function UserDataEditor({
	nameInput,
	usernameInput,
	passwordInput,
	defDatabaseInput,
}) {
	async function connectHandler() {
		"use server";
		redirect("/");
	}
	console.log("run form");
	return (
		<div>
			{nameInput && <h1>{`Welcome back ${nameInput}`}</h1>}
			{nameInput && usernameInput !== "" && passwordInput !== "" && (
				<div>
					<p>
						{`The current used username is: `}
						<strong>{usernameInput}</strong>
					</p>
					<p>
						{`The current used password is: `}
						<strong>{passwordInput}</strong>
					</p>
					<p>
						{`The default database is: `}
						<strong>{defDatabaseInput}</strong>
					</p>
					<form action={connectHandler}>
						<button type="submit">Connect</button>
					</form>
				</div>
			)}
			<SaveDataForm
				usernameInput={usernameInput}
				passwordInput={passwordInput}
			/>
		</div>
	);
}

export default UserDataEditor;
