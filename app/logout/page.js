"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { removeAuthTokens } from "@/actions/cookieActions";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      removeAuthTokens();
      router.push("/");
    })();
  }, []);

  return null;
};

export default LogoutPage;
