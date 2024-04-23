import { auth, signIn, signOut } from "@/auth";
import SetupForm from "@/components/setup-form/form";
import { redirect } from "next/navigation";

async function SetupPage() {
	const session = await auth();

	if (session) {
		const { user } = session;
		const { email, id, image, name } = user;

		console.log(email, id, name);
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
					<form action={logoutHandler}>
						<button type="submit">Logout</button>
					</form>
				)}
			</div>
			{session && <SetupForm />}
		</main>
	);
}

export default SetupPage;
