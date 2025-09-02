import { useContext, useState } from "react";
import { GuestContext } from "../../context/GuestContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api";
import { OrderSummary } from "./OrderSummary";
import { ShippingForm } from "./ShippingForm";

export function Checkout() {
  const { cart, userId, loadCart } = useContext(GuestContext);
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    street: "",
    city: "",
    zipCode: ""
  });

  const handlePlaceOrder = async () => {
    if (!shipping.street || !shipping.city || !shipping.zipCode) {
      toast.error("Please fill in all shipping fields");
      return;
    }
    
    await loadCart(userId);

    if (!cart.items.length) {
      toast.error("Cart is empty");
      return;
    }

    const orderPayload = {
      userId,
      items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      shippingAddress: shipping
    };
    setIsPlacing(true);

    try {
      await api.post("/orders", orderPayload);
      toast.success("Order placed successfully!");
      loadCart(userId);
      navigate("/orders");
    } catch (err) {
      toast.error(err.message || "Failed to place order");
    } finally {
        setIsPlacing(false);
    }
  };

  if (!cart.items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-600">
        <img
          src="/icons/empty-cart.png"
          alt="No items"
          className="w-24 h-24 mb-6 opacity-70"
        />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p className="text-sm mt-2 text-gray-500">
          Add some products to your cart before checking out.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          Go to Store
        </a>
      </div>
    );
  }

  return <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Checkout</h2>

      <OrderSummary items={cart.items} totalAmount={cart.totalAmount} />

      <ShippingForm shipping={shipping} setShipping={setShipping} />

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-green-700 transition"
        disabled={ isPlacing }
      >
        Place Order
      </button>
    </div>
}
