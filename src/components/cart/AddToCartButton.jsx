import { useContext, useState } from "react";
import { GuestContext } from "../../context/GuestContext";
import { toast } from "react-toastify";
import api from "../../api"

export function AddToCartButton({ id, name, inStock }) {
    const { userId, loadCart } = useContext(GuestContext);
    const [isAdding, setIsAdding] = useState(false);
    const handleAddToCart = async (productId, name) => {
        setIsAdding(true);
        try {
            const payload = { productId, quantity: 1 };
            const response = await api.post(`/cart/${userId}`, payload);
            
            toast.success(response.data?.message || `${name} added to cart successfully`);
            loadCart(userId);
        } catch (err) {
            const errorMessage =
            err.response?.data?.message || err.message || "Something went wrong";
            toast.error(errorMessage);
        } finally {
            setIsAdding(false);
        }
    }
    return <button
        className={`mt-2 w-full text-white font-semibold py-2 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed ${inStock ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
        disabled={!inStock || isAdding}
        onClick={() => handleAddToCart(id, name)}
        >
        { inStock ? "Add to Cart" : "Out Of Stock" }
    </button>
}
