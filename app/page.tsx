import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { unstable_noStore } from "next/cache";
import {
	mongoCollectionsGetter,
	mongoFindUser,
	mongoGetNumberOfItems,
	mongoMessagesGetter,
} from "@/lib/mongoDB-handler";

import HomePageControls from "@/components/home-page/home-page-controls";
import Dropdown from "@/components/home-page/dropdown";
import LoadingSpinner from "@/components/ui/loading-spinner";
import MessagesTable from "@/components/home-page/messages/messages-table";
import Card from "@/components/ui/card";

const Messages: React.FC<{
	searchParams?: { [key: number]: number | undefined | string[] | string };
}> = async ({ searchParams }) => {
	unstable_noStore();
	const session = await auth();

	if (session && session.user.email) {
		const userProfileData = await mongoFindUser(session.user.email);
		const messages = await mongoMessagesGetter(
			searchParams,
			userProfileData.username,
			userProfileData.password,
			userProfileData.database,
			userProfileData.collection
		);
		return (
			<MessagesTable messagesIn={messages} userProfile={userProfileData} />
		);
	}
};

async function HomePage({
	searchParams,
}: {
	searchParams?: { [key: number]: number | string[] | undefined };
}) {
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

		const numberOfItems = await mongoGetNumberOfItems(
			userProfileData.username,
			userProfileData.password,
			userProfileData.database,
			userProfileData.collection
		);

		const collection: string = userProfileData.collection;

		return (
			<main>
				<Card>
					<Dropdown
						selectedValue={collection}
						collectionsArray={collections}
						userEmail={session.user.email}
					/>
				</Card>

				<Suspense fallback={<LoadingSpinner />}>
					<Messages searchParams={searchParams} />
				</Suspense>

				<HomePageControls numberOfItems={numberOfItems} />
			</main>
		);
	}
}

export default HomePage;
