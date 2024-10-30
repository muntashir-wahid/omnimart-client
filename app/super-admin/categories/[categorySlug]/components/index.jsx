"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const SuperAdminCategoryDetailsModule = ({ categorySlug }) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: [`categories/${categorySlug}`],
    queryFn: () => APIKit.categories.getCategoryDetails(categorySlug),
  });

  if (isLoading) {
    return <DataLoadingState content="Category Details is Loading..." />;
  }

  const { name, slug, description, createdAt, categoryStatus, updatedAt } =
    data.data.category;

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl mx-auto my-6 bg-gray-50 rounded-md shadow-lg">
      <figure>
        <Image
          src="https://plus.unsplash.com/premium_vector-1725687694477-17bd773e4d99"
          height={600}
          width={400}
          alt="User Image"
          className="w-full max-h-80 rounded-md"
        />
      </figure>
      <article className="px-3 md:px-8 flex flex-col gap-2 text-lg text-gray-700 font-medium">
        <p>
          <span className="font-bold">Name:</span> {name}
        </p>
        <p>
          <span className="font-bold">Description: </span>
          {description}
        </p>
        <p>
          <span className="font-bold">Created At: </span>
          {format(createdAt, "PP")}
        </p>
        <p>
          <span className="font-bold">Updated At: </span>
          {format(updatedAt, "PP")}
        </p>
        <p>
          <span className="font-bold">Status: </span>
          <span className="capitalize">{categoryStatus.toLowerCase()}</span>
        </p>
      </article>
      <div className="flex gap-4 self-center mb-6">
        <Button variant="outline" asChild>
          <Link href={`/super-admin/categories/${slug}/edit`}>Update</Link>
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  );
};

export default SuperAdminCategoryDetailsModule;
