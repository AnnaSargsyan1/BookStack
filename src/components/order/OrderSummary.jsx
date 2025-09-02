export function OrderSummary({ items, totalAmount }) {
    if (!items || items.length === 0) return null;
  
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {items.map(item => (
          <div key={item.productId} className="flex justify-between mb-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${totalAmount}</span>
        </div>
      </div>
    );
  }
  