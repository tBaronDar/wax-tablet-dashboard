import { auth } from "@/auth";
import MessagesTable from "@/components/home-page/messages-table";
import Dropdown from "@/components/setup-form/dropdown";

import { readUserData } from "@/lib/config-editor";
import {
	mongoCollectionsGetter,
	mongoMessagesGetter,
} from "@/lib/mongoDB-handler";

import { redirect } from "next/navigation";

async function HomePage() {
	const session = await auth();
	if (!session) {
		redirect("/setup");
	}

	if (session && session.user) {
		const userProfileData = await readUserData(session.user.email);
		const collections = await mongoCollectionsGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.defDatabase
		);
		const messages = await mongoMessagesGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.defDatabase,
			userProfileData.collection
		);

		return (
			<main>
				<Dropdown selectedValue={userProfileData.collection}>
					{collections}
				</Dropdown>
				<button type="button">Refresh</button>
				<h1>This are the messages</h1>
				<MessagesTable
					username={userProfileData.username}
					password={userProfileData.password}
					messagesIn={messages}
				/>
			</main>
		);
	}
}

export default HomePage;
