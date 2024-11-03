import Image from "next/image";
import { Minus, Plus } from "lucide-react";

import APIKit from "@/lib/apiKit";
import { calcDiscountPrice } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CartItem = ({
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
  refetchCart,
}) => {
  const handleCartIncrement = async () => {
    await APIKit.cart.addProductToCart({ productUid: uid });
    refetchCart();
  };

  const handleCartDecrement = async () => {
    await APIKit.cart.addProductToCart({
      productUid: uid,
      decrement: true,
    });
    refetchCart();
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-6 bg-gray-100 px-4 py-6 shadow-lg rounded-md">
      <div className="flex gap-3 w-full md:w-1/2">
        <figure>
          <Image
            src="https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=700"
            height={300}
            width={300}
            // alt="Cart Product Image"
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

      <div className="w-full md:w-1/4 md:self-center font-semibold text-lg text-gray-600">
        <p className="hidden md:block">
          ${calcDiscountPrice(price, discount)} x {quantity}
        </p>

        <p className="block md:hidden">
          Price: ${calcDiscountPrice(price, discount)} x {quantity}
        </p>
      </div>

      <div className="flex items-center gap-2 w-full md:w-1/4">
        <Button size="icon" onClick={handleCartDecrement}>
          <Minus />
        </Button>

        <span className="px-5 py-[6px] rounded-md bg-gray-100 text-gray-800 text-center">
          {quantity}
        </span>
        <Button size="icon" onClick={handleCartIncrement}>
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
