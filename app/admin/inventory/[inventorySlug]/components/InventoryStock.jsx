import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import StockItem from "./StockItem";
import AddNewStock from "./AddNewStock";

const InventoryStock = ({ product }) => {
  const [openStockAddModal, setOpenStockAddModal] = useState(false);
  const {
    uid,
    name,
    basePrice,
    category: { uid: categoryUid },
  } = product;

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`inventory/${uid}/stocks`],
    queryFn: () => APIKit.inventory.stock.getInventoryAllStocks(uid),
  });

  if (isLoading) {
    return <DataLoadingState content="Inventory Stocks is Loading..." />;
  }

  const { stocks } = data.data;

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start sm:items-center">
          <h3 className="text-2xl font-bold text-gray-700">
            {name} Stock Details
          </h3>
          <Button onClick={() => setOpenStockAddModal(true)}>
            <Plus />
            <span className="hidden sm:inline-block">Add New Stock</span>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          {stocks.map((stock) => (
            <StockItem key={stock.uid} stock={stock} />
          ))}
        </div>
      </div>
      <AddNewStock
        categoryUid={categoryUid}
        inventoryUid={uid}
        basePrice={basePrice}
        openStockAddModal={openStockAddModal}
        setOpenStockAddModal={setOpenStockAddModal}
        refetchStock={refetch}
      />
    </>
  );
};

export default InventoryStock;
