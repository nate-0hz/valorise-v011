"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";

export default function Header() {
  const { data: session } = useSession();
  return(
    <>
    <SessionProvider session={session}>
      <AuthButton />
    </SessionProvider>
    </>
  )
}