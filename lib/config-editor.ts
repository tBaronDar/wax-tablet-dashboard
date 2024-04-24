"use server";
import fs from "fs";
import path from "path";

export async function getCreds(formData: FormData) {
	const username = formData.get("username").toString();
	const password = formData.get("password").toString();

	//validation

	const readData = await readJsonData();
	const inputData = {
		...readData,
		username,
		password,
	};

	//console.log(inputData);

	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const inputJson = JSON.stringify(inputData);
	fs.writeFileSync(filePath, inputJson);

	return inputData;
}

export async function dropdownSelector(selector: string, data: string) {
	const readData = await readJsonData();

	let inputData = {};
	if (selector === "collection") {
		inputData = {
			...readData,
			collection: data,
		};
	}
	if (selector === "database") {
		inputData = {
			...readData,
			database: data,
		};
	}

	const filePath = path.join(process.cwd(), "/state/creds.json");
	const inputJson = JSON.stringify(inputData);
	fs.writeFileSync(filePath, inputJson);
}

export async function writeJsonFile(inputData) {
	const filePath = path.join(process.cwd(), "/state/creds.json");
	const inputJson = JSON.stringify(inputData);
	fs.writeFileSync(filePath, inputJson);
}

export async function readJsonData() {
	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const data = fs.readFileSync(filePath).toString();

	return JSON.parse(data);
}

export async function readUserData(email: string) {
	const filePath = path.join(process.cwd(), "/data/user-data.json");
	const dataJson = fs.readFileSync(filePath).toString();

	const data = JSON.parse(dataJson);

	return data.find((user) => user.email === email);
}
