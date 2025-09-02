import { ProductCard } from "./ProductCard";
import { useState, useEffect, useCallback } from "react";
import api from "../../api";
import { CategoryFilter } from "./CategoryFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function ProductList() {
    const [books, setBooks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("All");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        api.get(`/products/category/${currentCategory}`)
        .then(data => {
            setBooks(data.data)
        })
        .catch(err => {
            if (err.response?.status === 404) {
                navigate("/not-found", { replace: true });
            } else {
                toast.error(err);
            }
        }).finally(() => setLoading(false));
    }, [currentCategory]);
    const handleCategoryFilter = useCallback(category => {
        setCurrentCategory(category || "All");
    })

    if (loading) {
        return (
          <div className="text-center text-gray-500 py-20">
            Loading book details...
          </div>
        );
    }

    return <div >
        <div className="px-6">
            <CategoryFilter onCategoryFilter={handleCategoryFilter} length={books.length} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {books.map((book) => (
            <ProductCard key={book.id} book={book}/>
        ))}
        </div>
  </div>
}
