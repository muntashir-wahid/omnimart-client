"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import OrderedProductCard from "./OrderedProductCard";
import OrderPriceSummary from "./OrderPriceSummary";
import OrderTrackingInfo from "./OrderTrackingInfo";
import UserAddressCard from "@/components/shared/UserProfile/UserAddressCard";

const UserOrderDetailsModule = ({ orderUid }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`order/${orderUid}`],
    queryFn: () => APIKit.orders.getOrder(orderUid),
  });

  if (isLoading) {
    return <DataLoadingState content="Order Details is Loading..." />;
  }

  const {
    order: {
      OrderLine,
      deliveryCharge,
      totalPrice,
      createdAt,
      orderStatus,
      updatedAt,
      userAddress,
    },
  } = data.data;

  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-3/5">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Ordered Products
        </h3>

        <div className="flex flex-col gap-6">
          {OrderLine.map((product) => (
            <OrderedProductCard key={product.uid} orderedProduct={product} />
          ))}
        </div>
      </div>

      <div className="w-full md:w-2/5">
        <h3 className="text-2xl font-semibold text-gray-700  mb-6">
          Ordered Summary
        </h3>

        <div className="flex flex-col gap-8">
          <OrderPriceSummary
            deliveryCharge={deliveryCharge}
            totalPrice={totalPrice}
          />

          <OrderTrackingInfo
            createdAt={createdAt}
            orderStatus={orderStatus}
            updatedAt={updatedAt}
          />

          <div>
            <UserAddressCard addressData={userAddress} isEditAble={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailsModule;
