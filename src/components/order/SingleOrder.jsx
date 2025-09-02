import React from "react";

// Reusable component for a single order
export function SingleOrder({ order }) {
  if (!order.items || order.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-gray-600 border rounded-lg mb-4">
        <h2 className="text-lg font-semibold">No items in this order</h2>
        <p className="text-sm mt-1 text-gray-500">Nothing to display here.</p>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 border rounded-lg shadow-md bg-white">
      {/* Order Info */}
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-semibold">Order ID:</span> {order.id}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Order Date:</span>{" "}
          {new Date(order.orderDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Status:</span> {order.status}
        </p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Items</h3>
        <div className="space-y-2">
          {order.items.map(item => (
            <div
              key={item.productId}
              className="flex justify-between items-center p-3 border rounded-md"
            >
              <div>
                <p className="font-semibold text-gray-800">{item.productName}</p>
                <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
              </div>
              <p className="font-bold text-gray-800">
                ${item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-4">
        <p className="text-lg font-bold text-gray-800">
          Total: ${order.totalAmount}
        </p>
      </div>

      {/* Shipping */}
      <div className="p-3 border rounded-md bg-gray-50">
        <h3 className="text-lg font-semibold mb-1 text-gray-800">Shipping Address</h3>
        <p className="text-gray-700">{order.shippingAddress.street}</p>
        <p className="text-gray-700">
          {order.shippingAddress.city}, {order.shippingAddress.zipCode}
        </p>
      </div>
    </div>
  );
}

