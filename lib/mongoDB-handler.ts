"use server";

import { MongoClient } from "mongodb";
import { readJsonData } from "./config-editor";

async function mongoConnector(username: string, password: string) {
	if (!username || !password || username === "" || password === "") {
		return;
	}
	try {
		const mongodbUrl = `mongodb+srv://${username}:${password}@generic.eucy2zz.mongodb.net/?retryWrites=true&w=majority&appName=Generic`;
		const client = await MongoClient.connect(mongodbUrl);

		return client;
	} catch (error) {
		throw new Error("Couldn't connect");
	}
}

export async function mongoCollectionsGetter(username, password, database) {
	const client = await mongoConnector(username, password);
	if (!client) {
		return;
	}

	const db = client.db(database);

	//get all the collections names.
	const collections = await db.listCollections().toArray();
	const collectionsNames = [];

	collections.map((obj) => {
		collectionsNames.push(`${obj.name}`);
	});

	client.close();

	return collectionsNames;
}

export async function mongoDatabaseGetter(
	username: string,
	password: string,
	database: string
) {
	const client = await mongoConnector(username, password);

	if (!client) {
		return;
	}
	const db = client.db(database);
	const databasesObjArray = (await db.admin().listDatabases()).databases;
	const databasesNames: string[] = [];

	databasesObjArray.map((obj) => {
		databasesNames.push(`${obj.name}`);
	});

	return databasesNames;
}

export async function mongoMessagesGetter(
	username: string,
	password: string,
	database: string,
	collection: string
) {
	const client = await mongoConnector(username, password);
	if (!client) {
		return;
	}
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
