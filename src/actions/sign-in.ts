'use server';

import * as auth from "@/auth";

export async function signIn() {
  return auth.signIn('github'); //need to pass a string to show what provider we want to sign in with
};
