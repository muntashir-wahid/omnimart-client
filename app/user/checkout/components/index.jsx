"use client";

import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PencilLine } from "lucide-react";

const paymentMethods = [
  { name: "Cash on Deliver", slug: "cash-on-deliver" },
  { name: "Online Payment", slug: "online-payment" },
];

const deliveryMethods = [
  { name: "Home Delivery", slug: "home-delivery" },
  { name: "Pick-up Point", slug: "pick-up-point" },
];

const CheckoutModule = () => {
  const user = useSelector((state) => state.currentUser.user);

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
            defaultValue="cash-on-deliver"
            // onValueChange={(value) => console.log(value)}
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
            defaultValue="home-delivery"
            // onValueChange={(value) => console.log(value)}
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
      </div>
    </div>
  );
};

export default CheckoutModule;
