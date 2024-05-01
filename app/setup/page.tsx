import { auth } from "@/auth";
import UserDataEditor from "@/components/setup-form/user-data-editor";
import { loginHandler } from "@/lib/actions";
import { readUserData } from "@/lib/config-editor";

async function SetupPage() {
	const session = await auth();

	let username: string, password: string, defDatabase: string;
	if (session && session.user) {
		const { user } = session;
		const { email, id, image } = user;

		const userProfile = await readUserData(email);
		username = userProfile.username;
		password = userProfile.password;
		defDatabase = userProfile.defDatabase;
	}

	return (
		<main>
			{!session && (
				<form action={loginHandler}>
					<p>
						Please Login in order to save your mongoDb credentials and view your
						messages.
					</p>
					<button type="submit">Login</button>
				</form>
			)}
			{session && (
				<UserDataEditor
					nameInput={session.user.name}
					usernameInput={username}
					passwordInput={password}
					defDatabaseInput={defDatabase}
				/>
			)}
		</main>
	);
}

export default SetupPage;
