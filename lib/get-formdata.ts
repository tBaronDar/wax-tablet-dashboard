"use server";
import fs from "fs";
import path from "path";
import { readJsonData } from "./get-file-data";

export async function getData(formData: FormData) {
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

  const filePath = path.join(process.cwd(), "/state/creds.json");
  const inputJson = JSON.stringify(inputData);
  fs.writeFileSync(filePath, inputJson);

  return inputData;
}
