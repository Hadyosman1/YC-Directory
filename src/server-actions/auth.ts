"use server";
import { signOut, signIn } from "@/../auth";
import { User } from "next-auth";

export async function logout() {
  await signOut();
}

export async function login() {
  await signIn("github");
}
