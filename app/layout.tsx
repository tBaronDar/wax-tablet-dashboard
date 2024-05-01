import type { Metadata } from "next";
import MainNavigation from "@/components/layout/main-navigation";
import SessionProviderComp from "@/components/layout/session-provider";

import "./globals.css";

export const metadata: Metadata = {
	title: "Wax Tablet",
	description: "A mongoDb brower dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<SessionProviderComp>
					<MainNavigation />
					{children}
				</SessionProviderComp>
			</body>
		</html>
	);
}
