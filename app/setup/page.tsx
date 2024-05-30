import { auth } from "@/auth";
import { mongoFindUser } from "@/lib/mongoDB-handler";
import SetupControls from "@/components/setup-form/setup-controls";
import UserDataEditor from "@/components/setup-form/user-data-editor";
import Card from "@/components/ui/card";

async function SetupPage() {
	const session = await auth();

	let username: string,
		password: string,
		collection: string,
		database: string,
		name: string;

	if (session && session.user.email) {
		//console.log(session);
		const { user } = session;
		const { email, id, image } = user;
		//console.log(email);

		const userProfile = await mongoFindUser(email);
		username = userProfile.username;
		password = userProfile.password;
		collection = userProfile.collection;
		database = userProfile.database;

		if (session.user.name) {
			name = session.user.name;
		} else {
			name = userProfile.name;
		}
	}

	return (
		<main>
			{!session && (
				<Card>
					<SetupControls />
				</Card>
			)}
			{session && (
				<Card>
					<UserDataEditor
						nameInput={name}
						usernameInput={username}
						passwordInput={password}
						collectionInput={collection}
						databaseInput={database}
					/>
				</Card>
			)}
		</main>
	);
}

export default SetupPage;
