import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import APIKit from "@/lib/apiKit";
import { sanitizeParams } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import AddNewStock from "./AddNewStock";
import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import SearchField from "@/components/shared/Form/SearchField";
import StockItem from "./StockItem";

const InventoryStock = ({ product }) => {
  const [openStockAddModal, setOpenStockAddModal] = useState(false);
  const {
    uid,
    name,
    basePrice,
    category: { uid: categoryUid },
  } = product;

  const [params, setParams] = useState({ search: "" });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [`inventory/${uid}/stocks`],
    queryFn: () =>
      APIKit.inventory.stock.getInventoryAllStocks(uid, sanitizeParams(params)),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <DataLoadingState content="Inventory Stocks is Loading..." />;
  }

  const { stocks } = data.data;

  const handleParamsChange = (value, fieldName) => {
    setParams((prevParams) => {
      const newParams = { ...prevParams };
      newParams[fieldName] = value;
      return newParams;
    });
  };

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

        <div className="flex flex-col md:flex-row gap-6">
          <div className="space-y-2 w-full">
            <Label htmlFor="search">Search Stock</Label>
            <SearchField
              id="search"
              name="search"
              value={params.search}
              onChange={(event) =>
                handleParamsChange(event.target.value, "search")
              }
              placeholder="Search by SKU..."
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {stocks.map((stock) => (
            <StockItem
              key={stock.uid}
              stock={stock}
              productName={name}
              inventoryUid={uid}
              refetchStock={refetch}
            />
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
