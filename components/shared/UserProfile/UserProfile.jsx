"use client";

import Image from "next/image";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";

import DataLoadingState from "../Loaders/DataLoadingState";

const UserProfile = ({ extraClassNames }) => {
  const user = useSelector((state) => state.currentUser.user);

  if (!user) {
    return <DataLoadingState content="User Summary is Loading..." />;
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center gap-8">
        <h2 className="text-3xl font-bold text-gray-600">
          User Profile Summary
        </h2>
        <Button variant="outline">
          <PencilLine />
          Edit
        </Button>
      </div>
      <div className="w-full min-h-[70vh]  md:h-[70vh] flex flex-col md:flex-row gap-8 border rounded-md shadow px-4 py-6">
        <figure className="h-full self-center md:self-start md:basis-1/2">
          <Image
            src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=500&auto=format&fit=crop&q=60"
            height={400}
            width={600}
            alt="User Profile"
            className="h-80 w-80 rounded-full md:h-full md:w-full aspect-auto object-cover md:rounded-lg"
          />
        </figure>

        <div className="h-full basis-full md:basis-1/2 flex flex-col gap-4 bg-gray-50 rounded-lg p-6">
          <p className="text-lg md:text-xl font-medium">
            <span className="text-gray-800">Name: </span>
            <span className="text-gray-600">
              {user.firstName} {user.lastName}
            </span>
          </p>

          <p className="text-lg md:text-xl font-medium">
            <span className="text-gray-800">Email: </span>
            <span className="text-gray-600">{user.email}</span>
          </p>

          <p className="text-lg md:text-xl font-medium">
            <span className="text-gray-800">Phone: </span>
            <span className="text-gray-600">{user.phone}</span>
          </p>

          <p className="text-lg md:text-xl font-medium">
            <span className="text-gray-800">Role: </span>
            <span className="text-gray-600 capitalize">
              {user.userRole.toLowerCase().split("_").join(" ")}
            </span>
          </p>

          <p className="text-lg md:text-xl font-medium">
            <span className="text-gray-800">Status: </span>
            <span className="text-gray-600 capitalize">
              {user.userStatus.toLowerCase()}
            </span>
          </p>

          <p className="text-lg md:text-xl font-medium">
            <span className="text-gray-800">Joined At: </span>
            <span className="text-gray-600 capitalize">
              {format(user.createdAt, "PP")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
