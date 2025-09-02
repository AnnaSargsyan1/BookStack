import { useContext, useEffect, useState } from "react";
import api from "../../api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GuestContext } from "../../context/GuestContext";
import { SingleOrder } from "./SingleOrder";

export function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const { userId } = useContext(GuestContext);
    useEffect(() => {
        api.get(`/orders/${userId}`)
            .then(data => {
                setOrders(data.data)
            })
            .catch(err => toast.error(err.message));
    }, []);
    if (orders.length <= 0) {
        return <div className="flex flex-col items-center justify-center py-20 text-gray-600">
            <img
            src="/icons/box.png"
            alt="No orders"
            className="w-24 h-24 mb-6 opacity-70"
            />
            <h2 className="text-xl font-semibold">Your order history is empty</h2>
            <p className="text-sm mt-2 text-gray-500">
            Start shopping and your past orders will appear here.
            </p>
            <Link
            href="/"
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
            Go to Store
            </Link>
        </div>
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
          {orders.map(order => (
            <SingleOrder key={order.id} order={order} />
          ))}
        </div>
      );
}
  