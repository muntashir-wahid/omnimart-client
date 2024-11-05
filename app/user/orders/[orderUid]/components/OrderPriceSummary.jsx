const OrderPriceSummary = ({ deliveryCharge, totalPrice }) => {
  return (
    <div className="flex flex-col gap-2 text-lg font-medium">
      <p className="flex items-center gap-2">
        <span className="text-gray-600">Total: </span>
        <span className="text-gray-800">${totalPrice}</span>
      </p>

      <p className="flex items-center gap-2">
        <span className="text-gray-600">Delivery Charge: </span>
        <span className="text-gray-800">${deliveryCharge}</span>
      </p>

      <div className="border" />

      <p className="flex items-center gap-2">
        <span className="text-gray-600">Grand Total: </span>
        <span className="font-bold text-gray-800">
          ${+totalPrice + +deliveryCharge}
        </span>
      </p>
    </div>
  );
};

export default OrderPriceSummary;
