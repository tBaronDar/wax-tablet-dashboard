import { auth, signIn, signOut } from "@/auth";
import UserDataEditor from "@/components/setup-form/user-data-editor";
import { readUserData } from "@/lib/config-editor";
import { redirect } from "next/navigation";

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

	async function loginHandler() {
		"use server";
		await signIn();
	}

	async function logoutHandler() {
		"use server";
		await signOut();
		//redirect("/setup");
	}

	return (
		<main>
			<div>
				{!session && (
					<form action={loginHandler}>
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
				{session && (
					<div>
						<form action={logoutHandler}>
							<button type="submit">Logout</button>
						</form>
					</div>
				)}
			</div>
		</main>
	);
}

export default SetupPage;
