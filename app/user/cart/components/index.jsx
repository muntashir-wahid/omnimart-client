"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Container from "@/components/shared/Container/Container";
import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartModule = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: APIKit.cart.getCart,
  });

  if (isLoading) {
    return <DataLoadingState content="Your Shopping Cart is Loading..." />;
  }

  const { cart } = data.data;

  if (!cart || cart.CartItems.length === 0) {
    return (
      <div>
        <h1 className="text-4xl font-bold">Your Shopping Bag</h1>
        <div className="mt-20 text-center">
          <p className="text-xl font-semibold text-gray-700">
            Your Shopping bag is empty.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/">Shop Now</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Container extraClassName="px-4 py-6 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-[70%]">
        <h1 className="text-4xl font-bold">Your Shopping Bag</h1>

        <div className="flex flex-col gap-4 mt-10">
          {cart.CartItems.map((cartProduct) => (
            <CartItem
              key={cartProduct.key}
              cartProduct={cartProduct}
              refetchCart={refetch}
            />
          ))}
        </div>
      </div>

      <div className="w-full lg:w-[30%] lg:self-start lg:mt-20 bg-gray-50 px-3 py-5 rounded-md shadow">
        <h3 className="text-xl font-bold mb-8">Cart Summary</h3>
        <CartSummary cart={cart.CartItems} />
      </div>
    </Container>
  );
};

export default CartModule;
