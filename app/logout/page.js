"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { removeAuthTokens } from "@/actions/cookieActions";
import { removeUser } from "@/store/features/currentUser/currentUser";
import { removeCart } from "@/store/features/cart/cartSlice";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const LogoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      removeAuthTokens();
      router.push("/");
      dispatch(removeUser());
      dispatch(removeCart());
    })();
  }, []);

  return (
    <DataLoadingState content="Logging Out..." extraClassNames="h-[95vh]" />
  );
};

export default LogoutPage;
