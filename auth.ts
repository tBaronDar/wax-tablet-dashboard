import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { readUserData } from "./lib/config-editor";
import { revalidatePath } from "next/cache";
import { UserProfile } from "./lib/types";
import { mongoFindUser } from "./lib/mongoDB-handler";

const credentialsConfig = CredentialsProvider({
	name: "Credentials",
	credentials: {
		waxUsername: {
			label: "Enter your email:",
			type: "email",
		},
		waxPassword: {
			label: "Enter your email:",
			type: "password",
			minLength: 6,
		},
	},
	async authorize(credentials) {
		//check if user exists

		const userEmail: string = credentials.waxUsername.toString();
		const user: UserProfile = await mongoFindUser(userEmail);
		//console.log(user);
		if (
			user &&
			user.email === credentials.waxUsername &&
			user.waxPassword === credentials.waxPassword
		) {
			const { email, name } = user;
			revalidatePath("/", "layout");
			return {
				email: email,
				name: name,
			};
		} else {
			return null;
		}
	},
});

const config = {
	providers: [Google, credentialsConfig],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
