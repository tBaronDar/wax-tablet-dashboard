"use server";

import { signOut, signIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function logoutHandler() {
	await signOut();
	revalidatePath("/", "layout");
	redirect("/setup");
}

export async function connectHandler() {
	revalidatePath("/", "layout");
	redirect("/");
}

export async function loginHandler() {
	await signIn();
	revalidatePath("/", "layout");
}
