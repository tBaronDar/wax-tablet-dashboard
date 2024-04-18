import Hero from "@/components/home-page/hero";
import MessagesTable from "@/components/home-page/messages-table";
import SetupForm from "@/components/home-page/setup-form/form";

import { readJsonData } from "@/lib/config-file-reader";
import {
	mongoConnectionHandler,
	mongoMessagesGetter,
} from "@/lib/mongoDB-handler";

async function HomePage() {
	const setupData = await readJsonData();

	const { username, password, database, collection, defDatabase } = setupData;

	const mongoData = await mongoConnectionHandler(defDatabase);
	const { collectionsNames, databasesNames } = mongoData;

	let usedDb = password;
	if (database === "" || !database) {
		usedDb = defDatabase;
	}

	const messages = await mongoMessagesGetter(usedDb, collection);

	console.log("&&&&&&&&&&&&&&&&");
	return (
		<section>
			<Hero />
			<SetupForm
				username={username}
				password={password}
				collections={collectionsNames}
				databases={databasesNames}
			/>
			<MessagesTable
				messages={messages}
				collection={collection}
				database={database}
			/>
		</section>
	);
}

export default HomePage;
