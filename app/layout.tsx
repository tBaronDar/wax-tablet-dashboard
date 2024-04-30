import type { Metadata } from "next";
import MainNavigation from "@/components/layout/main-navigation";
import SessionProviderComp from "@/components/layout/session-provider";

import "./globals.css";

export const metadata: Metadata = {
	title: "Wax Tablet",
	description: "Dashboard",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/code-64.png" sizes="any" />
			</head>
			<body>
				<SessionProviderComp>
					<MainNavigation />
					{children}
				</SessionProviderComp>
			</body>
		</html>
	);
}
