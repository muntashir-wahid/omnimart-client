"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const SuperAdminUserDetailsModule = ({ userUid }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [`users/${userUid}`],
    queryFn: () => APIKit.users.getUserDetails(userUid),
  });

  const handleUserDelete = async () => {
    try {
      await APIKit.users.deleteUser(userUid);
      console.log("User deleted successfully");
      router.push("/super-admin/users");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return <DataLoadingState content="User Details is Loading..." />;
  }

  const { firstName, lastName, email, phone, userStatus, userRole } =
    data.data.user;

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl mx-auto my-6 bg-gray-50 py-10 rounded-md shadow-lg">
      <figure className="self-center">
        <Image
          src="https://plus.unsplash.com/premium_vector-1720740375507-2c946054580f"
          height={150}
          width={150}
          alt="User Image"
          className="rounded-full"
        />
      </figure>
      <article className="px-3 md:px-8 flex flex-col gap-3 text-lg text-gray-700 font-medium bg-gray-100 w-[90%] md:w-4/5 mx-auto rounded-lg py-16">
        <p>
          <span className="font-bold">Name:</span> {firstName} {lastName}
        </p>
        <p>
          <span className="font-bold">Email: </span>
          {email}
        </p>
        <p>
          <span className="font-bold">Phone: </span>
          {phone}
        </p>
        <p>
          <span className="font-bold">Status: </span>
          {userStatus}
        </p>
        <p>
          <span className="font-bold">Role: </span>
          {userRole}
        </p>
      </article>
      <div className="flex gap-4 self-center">
        <Button variant="outline" asChild>
          <Link href={`/super-admin/users/${userUid}/edit`}>Update</Link>
        </Button>
        <Button variant="destructive" onClick={handleUserDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminUserDetailsModule;
