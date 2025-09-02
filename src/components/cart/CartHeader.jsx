import { Link } from "react-router-dom";
import { useContext } from "react";
import { GuestContext } from "../../context/GuestContext";

export function CartHeader() {
    const { cart } = useContext(GuestContext);
    return <div className="relative">
        <Link to="/cart">
        <img className="w-10 h-10" src="/icons/basket.png" alt="Cart" />
        {cart.items.length >= 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cart.items.reduce((a, b) => a + b.quantity, 0)}
            </span>
        )}
        </Link>
    </div>
}