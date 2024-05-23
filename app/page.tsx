import { auth } from "@/auth";
import HomePageControls from "@/components/home-page/home-page-controls";
import MessagesTable from "@/components/home-page/messages-table";
import Dropdown from "@/components/setup-form/dropdown";
import { connectHandler } from "@/lib/actions";

import {
	mongoCollectionsGetter,
	mongoFindUser,
	mongoMessagesGetter,
} from "@/lib/mongoDB-handler";

import { redirect } from "next/navigation";

async function HomePage() {
	const session = await auth();
	if (!session) {
		redirect("/setup");
	}

	if (session && session.user.email) {
		console.log(session);

		const userProfileData = await mongoFindUser(session.user.email);
		if (
			userProfileData.username === ("not set" || "") &&
			userProfileData.password === ("not set" || "")
		) {
			redirect("/setup");
		}

		const collections: string[] = await mongoCollectionsGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.database
		);

		const messages = await mongoMessagesGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.database,
			userProfileData.collection
		);

		const collection: string = userProfileData.collection;

		return (
			<main>
				<Dropdown selectedValue={collection} collectionsArray={collections} />
				<MessagesTable messagesIn={messages} />
				<HomePageControls refresher={connectHandler} />
			</main>
		);
	}
}

export default HomePage;
