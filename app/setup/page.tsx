import { auth } from "@/auth";
import SetupControls from "@/components/setup-form/setup-controls";
import UserDataEditor from "@/components/setup-form/user-data-editor";
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
			{!session && <SetupControls />}
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
