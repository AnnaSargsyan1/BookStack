import { useContext } from "react";
import { GuestContext } from "../../context/GuestContext";
import { toast } from "react-toastify";
import api from "../../api"

export function AddToCartButton({ id, name, inStock }) {
    const { userId, loadCart } = useContext(GuestContext);

    const handleAddToCart = async (productId, name) => {
        try {
            const payload = { productId, quantity: 1 };
            const response = await api.post(`/cart/${userId}`, payload);
        
            toast.success(response.data?.message || `${name} added to cart successfully`);
            loadCart(userId);
          } catch (err) {
            const errorMessage =
              err.response?.data?.message || err.message || "Something went wrong";
            toast.error(errorMessage);
          }
    }
    return <button
        className={`mt-2 w-full text-white font-semibold py-2 rounded-lg transition-colors duration-300 ${inStock ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
        disabled={!inStock}
        onClick={() => handleAddToCart(id, name)}
        >
        { inStock ? "Add to Cart" : "Out Of Stock" }
    </button>
}