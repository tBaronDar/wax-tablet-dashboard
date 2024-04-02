"use server";
import path from "path";
import fs from "fs";

export async function readJsonData() {
  const filePath = path.join(process.cwd(), "/state/creds.json");
  const tester = fs.readFileSync(filePath).toString();
  return JSON.parse(tester);
}
