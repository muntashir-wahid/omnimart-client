import { useEffect } from "react";

import { calcDiscountPrice } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SummaryWithOrderConfirm = ({ cart, formik }) => {
  const priceWithoutDiscount = cart.reduce(
    (accu, item) => accu + item.price * item.quantity,
    0
  );
  const priceWithDiscount = cart.reduce(
    (accu, item) => accu + item.discountPrice * item.quantity,
    0
  );

  useEffect(() => {
    formik.setFieldValue("totalPrice", priceWithDiscount);
  }, [priceWithDiscount]);

  return (
    <div className="flex flex-col gap-2 text-lg font-medium">
      <p className="flex items-center gap-2">
        <span className="text-gray-600">Sub Total: </span>
        <span className="text-gray-800">
          ${priceWithoutDiscount.toFixed(2)}
        </span>
      </p>

      <p className="flex items-center gap-2">
        <span className="text-gray-600">Discount: </span>
        <span className="text-gray-800">
          ${(priceWithoutDiscount - priceWithDiscount).toFixed(2)}
        </span>
      </p>

      <div className="border" />

      <p className="flex items-center gap-2">
        <span className="text-gray-600">Total: </span>
        <span className="font-bold text-gray-800">
          ${priceWithDiscount.toFixed(2)}
        </span>
      </p>

      <Button
        disabled={formik.isSubmitting}
        onClick={formik.handleSubmit}
        type="submit"
      >
        {formik.isSubmitting ? (
          <>
            <Loader2 className="animate-spin" />
            Please Wait
          </>
        ) : (
          "Place Order"
        )}
      </Button>
    </div>
  );
};

export default SummaryWithOrderConfirm;
