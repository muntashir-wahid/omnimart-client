"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { number, object, string } from "yup";
import { useFormik } from "formik";
import { PencilLine } from "lucide-react";
import { toast } from "sonner";

import APIKit from "@/lib/apiKit";
import { removeCart } from "@/store/features/cart/cartSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import ShoppingBagItem from "./ShoppingBagItem";
import SummaryWithOrderConfirm from "./SummaryWithOrderConfirm";

const paymentMethods = [
  { name: "Cash on Deliver", slug: "CASH_ON_DELIVERY" },
  { name: "Online Payment", slug: "ONLINE_PAYMENT" },
];

const deliveryMethods = [
  { name: "Home Delivery", slug: "HOME_DELIVERY" },
  { name: "Pick-up Point", slug: "PICK_UP_POINT" },
];

const checkoutSchema = object({
  totalPrice: number().required("Total price is required"),
  deliveryCharge: number().required("Delivery charge is required"),
  paymentMethod: string().required("Payment method is required"),
  deliveryMethod: string().required("Delivery method is required"),
  addressUid: string().required("Address is required"),
});

const CheckoutModule = () => {
  const user = useSelector((state) => state.currentUser.user);
  const cart = useSelector((state) => state.cart.cart);
  const router = useRouter();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      totalPrice: 0,
      deliveryCharge: 100,
      paymentMethod: "CASH_ON_DELIVERY",
      deliveryMethod: "HOME_DELIVERY",
      addressUid: "Jashore",
    },
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      try {
        const order = await APIKit.orders.placeOrder(values);
        dispatch(removeCart());
        router.push(`/user/orders/${order.data.order.uid}`);
        toast.success("Order placed successfully!");
      } catch (err) {
        console.log(err);
        const errorMessage =
          err?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
      }
    },
  });

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-16">
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div>
          <h3 className="text-2xl font-medium text-gray-600 mb-4">
            Customer Info
          </h3>

          {user ? (
            <div className="flex flex-col gap-3">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  className="h-9"
                  readOnly
                  type="name"
                  id="name"
                  value={`${user.firstName} ${user.lastName}`}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="h-9"
                  readOnly
                  type="email"
                  id="email"
                  value={user.email}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  className="h-9"
                  readOnly
                  type="phone"
                  id="phone"
                  value={user.phone}
                />
              </div>
            </div>
          ) : (
            <div>
              <p>Loading Customer...</p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-medium text-gray-600 mb-4">
            Payment Method
          </h3>

          <RadioGroup
            defaultValue={formik.values.paymentMethod}
            onValueChange={(value) =>
              formik.setFieldValue("paymentMethod", value)
            }
          >
            {paymentMethods.map((method) => (
              <div key={method.slug} className="flex items-center space-x-2">
                <RadioGroupItem value={method.slug} id={method.slug} />
                <Label htmlFor={method.slug}>{method.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-2xl font-medium text-gray-600 mb-4">
            Delivery Address
          </h3>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <h5>Default Address</h5>
                <Button variant="outline" size="icon">
                  <PencilLine className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Block: C, House: 36, New Market, Jashore.</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-medium text-gray-600 mb-4">
            Delivery Method
          </h3>

          <RadioGroup
            defaultValue={formik.values.deliveryMethod}
            onValueChange={(value) =>
              formik.setFieldValue("deliveryMethod", value)
            }
          >
            {deliveryMethods.map((method) => (
              <div key={method.slug} className="flex items-center space-x-2">
                <RadioGroupItem value={method.slug} id={method.slug} />
                <Label htmlFor={method.slug}>{method.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-medium text-gray-600 mb-4">
          Shopping Bag
        </h3>

        <div>
          {!cart ? (
            <div className="h-24 w-full flex items-center justify-center">
              <p>Shopping bag is loading...</p>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 mt-10">
                {cart?.map((cartProduct) => (
                  <ShoppingBagItem
                    key={cartProduct.cartItemUid}
                    cartProduct={cartProduct}
                  />
                ))}
              </div>

              <div>
                <h3 className="text-2xl font-medium text-gray-600 my-4">
                  Cart Summary
                </h3>
                <SummaryWithOrderConfirm formik={formik} cart={cart} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModule;
