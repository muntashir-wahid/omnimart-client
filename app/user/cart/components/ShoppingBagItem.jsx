import Image from "next/image";

import { calcDiscountPrice } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const ShoppingBagItem = ({
  cartProduct: {
    quantity,
    product: {
      uid,
      discount,
      price,
      baseProduct: { name },
      ProductConfigs,
    },
  },
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-2 bg-gray-100 px-4 py-6 shadow rounded-md">
      <div className="flex gap-3">
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=700"
            height={300}
            width={300}
            alt="Cart Product Image"
            className="w-full max-w-[100px] min-h-[80px] rounded-xl"
          />
        </figure>
        <div className="py-2">
          <h5 className="text-lg font-medium text-gray-600">{name}</h5>

          <div className="flex flex-wrap gap-2">
            {ProductConfigs.map((attribute) => (
              <Badge variant="outline" key={attribute.attributeValue.name}>
                <span className="text-gray-600">
                  {attribute.attributeValue.attributeUid.name}:{" "}
                </span>
                <span className="text-gray-700">
                  {attribute.attributeValue.name}
                </span>
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="font-semibold text-lg text-gray-600">
        <p className="hidden md:block">
          ${calcDiscountPrice(price, discount)} x {quantity}
        </p>

        <p className="block md:hidden">
          Price: ${calcDiscountPrice(price, discount)} x {quantity}
        </p>
      </div>
    </div>
  );
};

export default ShoppingBagItem;
