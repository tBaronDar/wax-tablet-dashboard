"use server";

import { MongoClient } from "mongodb";
import { readJsonData } from "./get-file-data";

export async function mongoGet() {
  const setupData = await readJsonData();
  const { username, password, collection, database } = setupData;

  const mongodbUrl = `mongodb+srv://${username}:${password}@generic.eucy2zz.mongodb.net/?retryWrites=true&w=majority&appName=Generic`;
  const client = await MongoClient.connect(mongodbUrl);
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
  console.log(collectionsNames);

  //get all messages
  const messages = await db.collection(collection).find().toArray();
  client.close();

  return { messages, collectionsNames, databasesNames };
}
