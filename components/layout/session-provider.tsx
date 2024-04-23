"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

function SessionProviderComp({ children }: { children: ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderComp;
