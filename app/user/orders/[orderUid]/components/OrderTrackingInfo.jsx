import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderTrackingInfo = ({ createdAt, orderStatus, updatedAt }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <h5>Order Tracking</h5>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="">Placed: </span>
          <span className="">{format(createdAt, "Pp")}</span>
        </p>
        <p>
          <span className="">Status: </span>
          <span className="capitalize">
            {orderStatus.toLowerCase().split("_").join(" ")}
          </span>
        </p>
        <p>
          <span className="">Last Update: </span>
          <span className="">{format(updatedAt, "Pp")}</span>
        </p>
      </CardContent>
    </Card>
  );
};

export default OrderTrackingInfo;
