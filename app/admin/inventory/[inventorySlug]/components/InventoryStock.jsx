import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const InventoryStock = ({ product }) => {
  const { name } = product;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start sm:items-center">
        <h3 className="text-2xl font-bold text-gray-700">
          {name} Stock Details
        </h3>
        <Button>
          <Plus />
          <span className="hidden sm:inline-block">Add New Stock</span>
        </Button>
      </div>
    </div>
  );
};

export default InventoryStock;
