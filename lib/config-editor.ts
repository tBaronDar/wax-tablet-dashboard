"use server";

import { signIn } from "@/auth";
import fs, { read } from "fs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";

export async function getCreds(formData: FormData, email: string) {
	const username = formData.get("username").toString();
	const password = formData.get("password").toString();
	const collection = formData.get("password").toString();
	const database = formData.get("password").toString();

	//validation

	const readData = await readJsonData();

	const currentUser = readData.find((user) => user.email === email);

	const newUserData = {
		...currentUser,
		username,
		password,
		collection,
		database,
	};

	readData.push(newUserData);

	//console.log(inputData);

	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const inputJson = JSON.stringify(readData);
	fs.writeFileSync(filePath, inputJson);

	return readData;
}

export async function writeJsonFile(inputData) {
	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const inputJson = JSON.stringify(inputData);
	fs.writeFileSync(filePath, inputJson);
}

export async function readJsonData() {
	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const data = fs.readFileSync(filePath).toString();

	return JSON.parse(data);
}

export async function readUserData(email: string) {
	//console.log(email);
	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const dataJson = fs.readFileSync(filePath).toString();

	const data = JSON.parse(dataJson);

	return data.find((user) => user.email === email);
}

export async function readUsersList() {
	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const dataJson = fs.readFileSync(filePath).toString();

	return JSON.parse(dataJson);
}

export async function changeUserData(
	email: string,
	selectedCollection: string
) {
	const userData = await readUserData(email);
	const dataList = await readUsersList();

	dataList.map((user) =>
		user.email === userData.email
			? (user.collection = selectedCollection)
			: user
	);

	await writeJsonFile(dataList);
	revalidatePath("/", "layout");
	redirect("/");
}

// export async function registerUser(formData: FormData) {
//   const readData = await readJsonData();

//   const userEmail = formData.get("userEmail");
//   const waxPassword = formData.get("waxPassword");
//   const name = formData.get("name");

//   readData.push({
//     email: userEmail,
//     waxPassword,
//     name,
//     username: "not set",
//     password: "not set",
//     defDatabase: "dummy-database",
//     collection: "dummy-collection",
//   });

//   const filePath = path.join(process.cwd(), "data", "user-data.json");
//   const inputJson = JSON.stringify(readData);
//   fs.writeFileSync(filePath, inputJson);

//   await signIn();

//   revalidatePath("/");
// }
