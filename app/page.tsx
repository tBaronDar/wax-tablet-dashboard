import { auth } from "@/auth";
import HomePageControls from "@/components/home-page/home-page-controls";
import MessagesTable from "@/components/home-page/messages-table";
import Dropdown from "@/components/home-page/dropdown";
import { connectHandler } from "@/lib/actions";
import { Suspense } from "react";

import {
	mongoCollectionsGetter,
	mongoFindUser,
	mongoMessagesGetter,
} from "@/lib/mongoDB-handler";

import { redirect } from "next/navigation";
import { unstable_noStore } from "next/cache";
import LoadingSpinner from "@/components/ui/loading-spinner";

async function Messages() {
	unstable_noStore();
	const session = await auth();

	if (session && session.user.email) {
		const userProfileData = await mongoFindUser(session.user.email);
		const messages = await mongoMessagesGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.database,
			userProfileData.collection
		);
		return <MessagesTable messagesIn={messages} />;
	}
}

async function HomePage() {
	unstable_noStore();
	const session = await auth();

	if (!session) {
		redirect("/setup");
	}

	if (session && session.user.email) {
		const userProfileData = await mongoFindUser(session.user.email);

		const collections: string[] = await mongoCollectionsGetter(
			userProfileData.username,
			userProfileData.password,
			userProfileData.database
		);

		const collection: string = userProfileData.collection;

		return (
			<main>
				<Dropdown
					selectedValue={collection}
					collectionsArray={collections}
					userEmail={session.user.email}
				/>

				<Suspense fallback={<LoadingSpinner />}>
					<Messages />
				</Suspense>

				<HomePageControls />
			</main>
		);
	}
}

export default HomePage;
