"use server";
import ServerContext from "@/store";
import { MongoClient } from "mongodb";
import { useContext } from "react";

export async function mongoGet(username: string, password: string) {
  const mongodbUrl = `mongodb+srv://${username}:${password}@generic.eucy2zz.mongodb.net/?retryWrites=true&w=majority&appName=Generic`;
  const client = await MongoClient.connect(mongodbUrl);
  const db = client.db("portfolio-dev");
  const collections = await db.listCollections().toArray();
  const messages = await db.collection("messages").find().toArray();
  client.close();

  const context = useContext(ServerContext);

  return { messages, collections };
}
