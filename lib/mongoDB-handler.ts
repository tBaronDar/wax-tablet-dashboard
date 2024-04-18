"use server";

import { MongoClient } from "mongodb";
import { readJsonData } from "./config-file-reader";

async function mongoConnector() {
	const readData = await readJsonData();
	const { username, password } = readData;

	const mongodbUrl = `mongodb+srv://${username}:${password}@generic.eucy2zz.mongodb.net/?retryWrites=true&w=majority&appName=Generic`;
	const client = await MongoClient.connect(mongodbUrl);
	return client;
}

export async function mongoConnectionHandler(database: string) {
	const client = await mongoConnector();
	const db = client.db(database);

	//get all the db names
	const databasesObjArray = (await db.admin().listDatabases()).databases;
	const databasesNames: string[] = [];

	databasesObjArray.map((obj) => {
		databasesNames.push(`${obj.name}`);
	});

	//get all the collections names.
	const collections = await db.listCollections().toArray();
	const collectionsNames = [];

	collections.map((obj) => {
		collectionsNames.push(`${obj.name}`);
	});
	//console.log(collectionsNames);

	client.close();

	return { collectionsNames, databasesNames };
}

export async function mongoMessagesGetter(
	database: string,
	collection: string
) {
	const client = await mongoConnector();
	//get all messages
	const db = client.db(database);
	const messages = db.collection(collection).find();
	const messagesComplexArray = await messages.toArray();
	const messagesArray = [];

	messagesComplexArray.map((message) =>
		messagesArray.push({
			name: message.name,
			email: message.email,
			message: message.message,
			id: message._id.toString(),
		})
	);
	client.close();

	return messagesArray;
}
