import type { Metadata } from "next";
import MainNavigation from "@/components/layout/main-navigation";
import { ServerContextProvider } from "@/store";

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
    <ServerContextProvider>
      <html lang="en">
        <body>
          <MainNavigation />
          <main>{children}</main>
        </body>
      </html>
    </ServerContextProvider>
  );
}
