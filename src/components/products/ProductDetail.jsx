import { useState, useEffect, useContext } from "react";
import api from "../../api";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AddToCartButton } from "../cart/AddToCartButton";

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (!id) return;

    api.get(`/products/${id}`)
      .then(data => {
        const bookData = data.data;
        setBook(bookData);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          navigate("/not-found", { replace: true });
        } else {
          toast.error(err.message || "Error fetching product");
        }
      });
  }, [id, navigate]);


  if (!book) {
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex-shrink-0">
          <img
            src={`/bookCovers/${book.imageUrl}`}
            alt={book.name}
            className="w-full h-full object-fill rounded-lg shadow-md"
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-between">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{book.name}</h2>
          <p className="text-gray-700 mb-4">{book.detailedDescription}</p>

          <div className="mt-4">
            <p className="text-xl text-gray-900 font-semibold mb-2">${book.price.toFixed(2)}</p>
            <p className="text-gray-500 mb-1">
              Category: <span className="font-medium text-gray-700">{book.category}</span>
            </p>

            <AddToCartButton
              inStock={book.inStock}
              id={book.id}
              name={book.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
