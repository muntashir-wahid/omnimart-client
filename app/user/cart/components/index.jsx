"use client";

import APIKit from "@/lib/apiKit";
import { useQuery } from "@tanstack/react-query";

const CartModule = () => {
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: APIKit.cart.getCart,
  });

  console.log(data);

  return <div>CartModule</div>;
};

export default CartModule;
