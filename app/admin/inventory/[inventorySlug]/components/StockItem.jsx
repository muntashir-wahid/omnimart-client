import { useState } from "react";
import { PencilLine } from "lucide-react";

import { Button } from "@/components/ui/button";
import EditStock from "./EditStock";

const StockItem = ({ stock, productName, refetchStock, inventoryUid }) => {
  const [openStockEditModal, setOpenStockEditModal] = useState(false);

  return (
    <>
      <div className="bg-slate-50 px-10 py-6 rounded-md flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h4 className="text-xl font-medium text-gray-600">
            Stock of <span className="font-bold text-black">{productName}</span>
          </h4>

          <Button variant="outline" onClick={() => setOpenStockEditModal(true)}>
            <PencilLine />
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-lg">
            <p>
              <span className="font-medium">SKU:</span> {stock.sku}
            </p>
            <p>
              <span className="font-medium">Stock:</span> {stock.stock}
            </p>
            <p>
              <span className="font-medium">Price:</span> {stock.price}
            </p>
            <p>
              <span className="font-medium">Discount:</span> {stock.discount}%
            </p>
            {/* <p>
          <span className="font-medium">Selling Price:</span> {stock.price * (stock.discount)}
        </p> */}
          </div>
          <div>
            <h5 className="text-xl font-semibold text-gray-600 mb-3">
              Product Attribute Info
            </h5>

            <ul className="list-inside list-disc space-y-2">
              {stock.ProductConfigs.map((attribute) => (
                <li key={attribute.uid}>
                  <span>{attribute.attributeValue.attributeUid.name}</span> :{" "}
                  <span>{attribute.attributeValue.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <EditStock
        stock={stock}
        refetchStock={refetchStock}
        openStockEditModal={openStockEditModal}
        setOpenStockEditModal={setOpenStockEditModal}
        inventoryUid={inventoryUid}
      />
    </>
  );
};

export default StockItem;
