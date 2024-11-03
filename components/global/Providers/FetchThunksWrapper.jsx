"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "@/store/features/currentUser/currentUser";

const FetchThunksWrapper = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return children;
};

export default FetchThunksWrapper;
