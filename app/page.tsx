import { auth } from "@/auth";
import MessagesTable from "@/components/home-page/messages-table";

import { readUserData } from "@/lib/config-editor";
import { mongoMessagesGetter } from "@/lib/mongoDB-handler";

import { redirect } from "next/navigation";

async function HomePage() {
	const session = await auth();
	if (!session) {
		redirect("/setup");
	}

	let userProfileData;
	let messages;
	if (session && session.user) {
		userProfileData = await readUserData(session.user.email);
		messages = await mongoMessagesGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.defDatabase,
			userProfileData.collection
		);
	}

	return (
		<main>
			<h1>This are the messages</h1>
			<button type="button">Refresh</button>
			<MessagesTable
				username={userProfileData.username}
				password={userProfileData.password}
				database={userProfileData.defDatabase}
				collection={userProfileData.collection}
				messagesIn={messages}
			/>
		</main>
	);
}

export default HomePage;
