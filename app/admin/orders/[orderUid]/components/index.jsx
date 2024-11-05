"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import OrderedProductCard from "@/app/user/orders/[orderUid]/components/OrderedProductCard";
import OrderTrackingInfo from "@/app/user/orders/[orderUid]/components/OrderTrackingInfo";
import OrderPriceSummary from "@/app/user/orders/[orderUid]/components/OrderPriceSummary";

const AdminOrderDetailsModule = ({ orderUid }) => {
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
      user: { firstName, lastName, email, phone },
    },
  } = data.data;

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div className="w-full lg:w-2/5">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Ordered Summary
        </h3>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-8 ">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <h5>User Info</h5>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Name: {firstName} {lastName}
              </p>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
            </CardContent>
          </Card>

          <div className="w-full">
            <OrderTrackingInfo
              createdAt={createdAt}
              orderStatus={orderStatus}
              updatedAt={updatedAt}
            />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-3/5">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Ordered Products
        </h3>

        <div className="flex flex-col gap-6 mb-10">
          {OrderLine.map((product) => (
            <OrderedProductCard key={product.uid} orderedProduct={product} />
          ))}
        </div>

        <OrderPriceSummary
          deliveryCharge={deliveryCharge}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  );
};

export default AdminOrderDetailsModule;
