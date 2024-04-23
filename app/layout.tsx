import type { Metadata } from "next";
import MainNavigation from "@/components/layout/main-navigation";

import "./globals.css";
import SessionProviderComp from "@/components/layout/session-provider";

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
			<body>
				<SessionProviderComp>
					<MainNavigation />
					{children}
				</SessionProviderComp>
			</body>
		</html>
	);
}
