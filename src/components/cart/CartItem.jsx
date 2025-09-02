import { useContext } from "react";
import { Link } from "react-router-dom";
import { GuestContext } from "../../context/GuestContext";
import api from "../../api";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

export function CartItem({ book }) {
    const { userId, loadCart } = useContext(GuestContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const updateQuantity = (productId, newQuantity) => {
        setIsUpdating(true);
        if (newQuantity < 1) { return toast.error("Minimum quantity is 1"); }

        if (!productId || !newQuantity) {
            return toast.error("Invalid payload data");
        }
        api.put(`/cart/${userId}/update`, { productId, quantity: newQuantity })
            .then(() => {
                loadCart(userId)
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    toast.error(err.response.data.message);
                } else {
                    toast.error("Something went wrong");
                }
            }).finally(() => setIsUpdating(false));
    }
    const handleRemove = productId => {
        api.delete(`/cart/${userId}/remove/${productId}`)
            .then(() => loadCart(userId))
            .catch(err => toast.error(err.message));
    }
    return <div className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
        <div className="flex items-center gap-4">
            <Link to={`/products/${book.productId}`}>
                <img
                    src={`/bookCovers/${book.imageUrl || "/bookCovers/placeholder.jpg"}`}
                    alt={book.name || "Book"}
                    className="w-36 object-cover rounded hover:opacity-70 cursor-pointer transition-all duration-300"
                />
            </Link>
            <div>
                <h3 className="font-semibold text-gray-800">{book.name || "Book Name"}</h3>
                <p className="text-gray-500 text-sm">Category: {book.category || "Unknown"}</p>
                <p className="text-gray-500 text-sm">Price: ${book.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => updateQuantity(book.productId, book.quantity - 1)}
                        disabled={isUpdating}
                    >
                        –
                    </button>
                    <span className="text-gray-800">{book.quantity}</span>
                    <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={() => updateQuantity(book.productId, book.quantity + 1)}
                        disabled={isUpdating}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
        <div className="text-right">
            <p className="font-bold text-gray-800">
                ${(book.price * book.quantity).toFixed(2)}
            </p>
            <button
                onClick={() => handleRemove(book.productId)}
                className="text-red-500 hover:text-red-700 transition-colors"
                title="Remove from cart"
                >
                <Trash2 size={24} />
            </button>
        </div>
    </div>
}
