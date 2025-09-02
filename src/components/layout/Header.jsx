import { Link } from "react-router-dom";
import { CartHeader } from "../cart/CartHeader";

export function Header() {
    return <header className="fixed top-0 w-full bg-green-600 text-white py-4 shadow-md z-50">
    <div className="container mx-auto px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link to="/">📚 BookStack</Link>
      </h1>
      <div className="flex items-center gap-6">
          <Link
            to="/checkout"
            className="text-lg font-medium hover:text-gray-200 transition"
          >
            Checkout
          </Link>
          <Link
            to="/orders"
            className="text-lg font-medium hover:text-gray-200 transition"
          >
            Orders
          </Link>
        <CartHeader />
      </div>
    </div>
  </header>
}