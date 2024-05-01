import { connectHandler } from "@/lib/actions";
import SaveDataForm from "./save-data-form";

import classes from "./user-data-editor.module.css";

function UserDataEditor({
	nameInput,
	usernameInput,
	passwordInput,
	defDatabaseInput,
}) {
	return (
		<div className={classes.master}>
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
					<p>
						If you have entered the mongoDb credentials, click connect to see
						messages.
					</p>
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
