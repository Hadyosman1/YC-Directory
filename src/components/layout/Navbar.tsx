import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/../auth";
import { login, logout } from "@/server-actions/auth";

import plusIcon from "@/../public/plus-icon.svg";
import logoutIcon from "@/../public/logout-icon.svg";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className={"flex h-20 items-center bg-white-100 py-4 shadow-md"}>
      <nav className={"container flex items-center justify-between gap-2"}>
        <Link className="shrink-[2]" href="/">
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={143}
            height={30}
            className="h-[30px] w-[143px]"
          />
          <span className={"sr-only"}>logo</span>
        </Link>

        <div className="flex items-center gap-4 overflow-hidden font-semibold md:gap-5">
          {session && session?.user ? (
            <>
              <Link className="hover:underline" href="/startup/create">
                <span className="sr-only md:not-sr-only">Create</span>
                <Image
                  src={plusIcon}
                  alt="add icon"
                  width={24}
                  height={24}
                  className="size-6 md:hidden"
                />
              </Link>

              <form
                className="flex items-center justify-center"
                action={logout}
              >
                <button
                  className="text-red-600 hover:underline"
                  type={"submit"}
                >
                  <span className="sr-only md:not-sr-only">Logout</span>
                  <Image
                    src={logoutIcon}
                    alt="add icon"
                    width={24}
                    height={24}
                    className="size-6 md:hidden"
                  />
                </button>
              </form>

              <Link
                title={session?.user?.name}
                className="shrink-0"
                href={`/user/${session?.id}`}
              >
                <Image
                  src={session?.user?.image}
                  alt={"user"}
                  width={40}
                  height={40}
                  unoptimized
                  priority
                  className={"aspect-square w-10 rounded-full bg-slate-300"}
                />
                <span className="sr-only">{session?.user?.name}</span>
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
