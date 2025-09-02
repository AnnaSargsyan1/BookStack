import { useContext } from "react";
import { GuestContext } from "../../context/GuestContext";
import { CartItem } from "./CartItem";
import { Link } from "react-router-dom";
import api from "../../api";

export function Cart() {
    const { userId, cart, loadCart } = useContext(GuestContext);
    const handleClearCart = userId => {
        api.delete(`/cart/${userId}/clear`)
            .then(() => loadCart(cart.userId))
            .catch(err => toast.error(err.message || "Error clearing cart"));
    }
    if (!cart || !cart.items) {
        return <p>Loading...</p>;
    }
    if (cart.items.length <= 0) {

        return <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <img
                src="/icons/empty-cart.png"
                alt="No orders"
                className="w-24 h-24 mb-6 opacity-70"
            />
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-sm mt-2 text-gray-500">
            Add some books to your cart and start your reading adventure!
            </p>
            <a
            href="/"
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
            Go to Store
            </a>
        </div>
    }

    return <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
        <div className="space-y-4">
            {cart.items.map((item) => (
                <CartItem book={item} key={item.productId}/>
            ))}
        </div>
        <div className="mt-6 flex justify-end items-center gap-6">
            <p className="text-xl font-semibold text-gray-800">
                Total: ${cart.totalAmount}
            </p>
            <Link to="/checkout" >
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
                    Proceed to Checkout
                </button>
            </Link>
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition" onClick={() => handleClearCart(userId)}>
                Clear Entire Cart
            </button>
        </div>
    </div>
  }
  