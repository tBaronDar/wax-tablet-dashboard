import { signIn, signOut } from "@/auth";

function SetupPage() {
	async function loginHandler() {
		"use server";
		await signIn();
	}

	async function logoutHandler() {
		"use server";
		await signOut();
	}

	return (
		<main>
			<div>
				<form onSubmit={loginHandler}>
					<button type="submit">Login</button>
				</form>
				<form onSubmit={logoutHandler}>
					<button type="submit">Logout</button>
				</form>
			</div>
		</main>
	);
}

export default SetupPage;
