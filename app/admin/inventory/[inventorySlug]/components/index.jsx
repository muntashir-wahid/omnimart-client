"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

import APIKit from "@/lib/apiKit";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import InventoryStock from "./InventoryStock";

const AdminInventoryDetailsModule = ({ inventorySlug }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`inventory/${inventorySlug}`],
    queryFn: () => APIKit.inventory.getInventory(inventorySlug),
  });

  if (isLoading) {
    return <DataLoadingState content="Inventory Details is Loading..." />;
  }

  const { inventory: product } = data.data;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-16">
      {/* Product Details Info */}
      <div className="flex flex-col gap-6">
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            height={400}
            width={1200}
            alt="Product Image"
            className="max-h-[400px] rounded-md"
          />
        </figure>
        <div className="bg-slate-50 px-10 py-6 rounded-md grid grid-cols-1 sm:grid-cols-2 gap-3 text-lg">
          <p>
            <span className="font-medium">Name:</span> {product.name}
          </p>
          <p>
            <span className="font-medium">Base Price:</span> {product.basePrice}
          </p>
          <p>
            <span className="font-medium">Category:</span>{" "}
            {product.category.name}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="capitalize">
              {product.productStatus.toLowerCase()}
            </span>
          </p>
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {format(product.createdAt, "PP")}
          </p>
          <p>
            <span className="font-medium">Updated At:</span>{" "}
            {format(product.updatedAt, "PP")}
          </p>
          <p>
            <span className="font-medium">Short Description:</span>{" "}
            {product.about}
          </p>
        </div>
      </div>

      {/* Inventory Stock */}
      <InventoryStock product={product} />
    </div>
  );
};

export default AdminInventoryDetailsModule;
