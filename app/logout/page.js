"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { removeAuthTokens } from "@/actions/cookieActions";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      removeAuthTokens();
      router.push("/");
    })();
  }, []);

  return (
    <DataLoadingState content="Logging Out..." extraClassNames="h-[95vh]" />
  );
};

export default LogoutPage;
