import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/../auth";
import { login, logout } from "@/server-actions/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={"bg-white-100 flex h-20 items-center py-4 shadow-sm"}>
      <nav className={"container flex items-center justify-between gap-2"}>
        <Link href="/">
          <Image src={"/logo.png"} alt={"logo"} width={143} height={29.5} />
          <span className={"sr-only"}>logo</span>
        </Link>

        <div
          className={
            "flex items-center gap-2 overflow-hidden font-semibold md:gap-5"
          }
        >
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={logout}>
                <button type={"submit"}>Logout</button>
              </form>

              <Link
                className={
                  "shrink-0 overflow-hidden overflow-ellipsis whitespace-nowrap"
                }
                href={`/user/${session?.id}`}
              >
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={login}>
              <button type={"submit"}>Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
