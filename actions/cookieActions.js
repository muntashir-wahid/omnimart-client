"use server";

import { cookies } from "next/headers";

export const removeAuthTokens = async () => {
  cookies().delete("ACCESS_TOKEN");
};

export const getToken = async () => {
  const token = cookies().get("ACCESS_TOKEN")?.value;
  return token;
};
