import { auth } from "@/auth";
import HomePageControls from "@/components/home-page/home-page-controls";
import MessagesTable from "@/components/home-page/messages-table";
import Dropdown from "@/components/setup-form/dropdown";
import { connectHandler } from "@/lib/actions";

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

				<MessagesTable messagesIn={messages} />
				<HomePageControls refresher={connectHandler} />
			</main>
		);
	}
}

export default HomePage;
