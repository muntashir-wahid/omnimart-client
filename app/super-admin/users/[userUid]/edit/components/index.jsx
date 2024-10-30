"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import UserUpdateForm from "./UserUpdateForm";

const SuperAdminUserEditModule = ({ userUid }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`users/${userUid}`],
    queryFn: () => APIKit.users.getUserDetails(userUid),
  });

  if (isLoading) {
    return <DataLoadingState content="User Details is Loading..." />;
  }

  const { user } = data.data;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 bg-gray-50 py-10 px-6 md:px-10 lg:px-16 rounded-md shadow-lg">
      <UserUpdateForm user={user} />
    </div>
  );
};

export default SuperAdminUserEditModule;
