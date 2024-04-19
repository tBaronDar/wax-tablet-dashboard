import MessagesTable from "@/components/home-page/messages-table";
import SetupForm from "@/components/home-page/setup-form/form";

import { readJsonData } from "@/lib/config-editor";
import {
	mongoDatabaseGetter,
	mongoCollectionsGetter,
} from "@/lib/mongoDB-handler";

async function HomePage() {
	const setupData = await readJsonData();

	const { username, password, database, collection, defDatabase } = setupData;

	let collectionsArray = [];
	let databasesArray = [];
	if (username !== "" && password !== "") {
		databasesArray = await mongoDatabaseGetter(defDatabase);

		if (databasesArray && databasesArray.length > 0) {
			collectionsArray = await mongoCollectionsGetter();
		}

		let usedDb = password;
		if (database === "" || !database) {
			usedDb = defDatabase;
		}
	}

	return (
		<section>
			<SetupForm
				username={username}
				password={password}
				databases={databasesArray}
				collections={collectionsArray}
			/>
			<MessagesTable />
		</section>
	);
}

export default HomePage;
