"use server";
import path from "path";
import fs from "fs";

export async function readJsonData() {
  const filePath = path.join(process.cwd(), "/state/creds.json");
  const data = fs.readFileSync(filePath).toString();
  return JSON.parse(data);
}
