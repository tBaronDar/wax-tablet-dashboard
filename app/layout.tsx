import type { Metadata } from "next";
import MainNavigation from "@/components/layout/main-navigation";

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
      <body>
        <MainNavigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
