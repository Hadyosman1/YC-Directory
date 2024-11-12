"use server";
import { signOut, signIn } from "@/../auth";

export async function logout() {
  await signOut();
}

export async function login() {
  await signIn("github");
}
