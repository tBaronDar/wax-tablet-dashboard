"use server";

import { MongoClient } from "mongodb";
import { readUserData } from "./config-editor";
import { UserProfile } from "./types";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

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

export async function mongoCollectionsGetter(
	username: string,
	password: string,
	database: string
) {
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

export async function mongoMessageEraser(
	email: string,
	selectedMessage: string
) {
	const userData = await readUserData(email);
	const client = await mongoConnector(userData.username, userData.password);

	const db = client.db(userData.defDatabase);
	try {
		await db
			.collection(userData.collection)
			.deleteOne({ message: selectedMessage });
	} catch (error) {
		console.log(error);
	}
}

export async function mongoRegisterNewUser(formData: FormData) {
	const connectionUsername = process.env.MONGO_USERNAME;
	const connectionPassword = process.env.MONGO_PASSWORD;

	const userEmail = formData.get("userEmail").toString();
	const waxPassword = formData.get("waxPassword").toString();
	const name = formData.get("name").toString();

	//validation

	const client = await mongoConnector(connectionUsername, connectionPassword);
	const db = client.db("wax-tablet");
	const existingUser = await db
		.collection("credentials")
		.findOne({ email: userEmail });

	if (existingUser) {
		throw new Error("Email in use!!");
	}

	const newUserProfile: UserProfile = {
		email: userEmail,
		waxPassword: waxPassword,
		name: name,
		collection: "",
		database: "",
		password: "",
		username: "",
	};

	await db.collection("credentials").insertOne(newUserProfile);

	client.close();

	redirect("/setup");

	return { status: "success", message: "Profile added" };
}
