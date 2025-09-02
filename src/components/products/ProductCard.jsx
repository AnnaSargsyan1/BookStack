import { Link } from "react-router-dom";
import { AddToCartButton } from "../cart/AddToCartButton";

export function ProductCard({ book }) {
    return <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow h-full">
    <Link to={`/products/${book.id}`}>
    <div className="w-full">
      <img
        src={`/bookCovers/${book.imageUrl}`}
        alt={book.name}
        className="w-full object-fill h-[330px] hover:opacity-70 cursor-pointer transition-all duration-300 "
        />
    </div>
    </Link>

    <div className="p-4 flex flex-col flex-grow justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{book.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{book.description}</p>
      </div>

      <div className="mt-2">
        <p className="text-gray-800 font-bold mb-1">${book.price?.toFixed(2)}</p>
        <p className="text-gray-500 text-sm mb-2">Category: {book.category}</p>
        <p className="text-gray-500 text-sm">Quantity: {book.quantity}</p>
        <AddToCartButton inStock={book.inStock} id={book.id} name={book.name}/>
      </div>
    </div>
  </div>
}