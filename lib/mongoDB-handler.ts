"use server";

import { MongoClient } from "mongodb";
import { readJsonData } from "./get-file-data";

export async function mongoGet() {
  const setupData = await readJsonData();
  const { username, password, collection, database } = setupData;

  const mongodbUrl = `mongodb+srv://${username}:${password}@generic.eucy2zz.mongodb.net/?retryWrites=true&w=majority&appName=Generic`;
  const client = await MongoClient.connect(mongodbUrl);
  const db = client.db(database);

  const databases = (await db.admin().listDatabases()).databases;
  console.log(databases);
  const collections = await db.listCollections().toArray();
  const messages = await db.collection(collection).find().toArray();
  client.close();

  return { messages, collections, databases };
}
