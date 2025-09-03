import { ProductCard } from "./ProductCard";
import { useState, useEffect, useCallback } from "react";
import api from "../../api";
import { CategoryFilter } from "./CategoryFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductSearch } from "./ProductSearch";
import { Pagination } from "../pagination/Pagination";

export function ProductList() {
    const [books, setBooks] = useState([]);
    const [currentCategory, setCurrentCategory] = useState("All");
    
    const [loading, setLoading] = useState(true);
    
    const [keyword, setKeyword] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();
    
    const fetchBooks = () => {

        api.get("/products", {
            params: {
                ...(currentCategory !== "All" && { category: currentCategory }),
                ...(keyword && { search: keyword }),
                page: Math.max(page, 1),
                limit: Math.max(limit, 12)
            }
        })
        .then(response => {
            console.log(response);
            setBooks(response.data.books);
            setTotal(response.data.total);
        })
        .catch(err => {
            if (err.response?.status === 404) {
                navigate("/not-found", { replace: true });
            } else {
                toast.error(err);
            }
        }).finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchBooks();
    }, [currentCategory, keyword, page, limit]);

    const handleCategoryFilter = useCallback(category => {
        setCurrentCategory(category || "All");
        setPage(1);
    });
    
    const handleSearch = keyword => {
        setKeyword(keyword);
        setPage(1);
    }

    if (loading) {
        return (
          <div className="text-center text-gray-500 py-20">
            Loading book details...
          </div>
        );
    }

    return <div >
        <div className="px-6">
            <ProductSearch onSearch={handleSearch} />
            <CategoryFilter onCategoryFilter={handleCategoryFilter} length={total} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {books.map((book) => (
            <ProductCard key={book.id} book={book}/>
        ))}
        </div>
        <Pagination
            current={page}
            total={total}
            limit={limit}
            onPageChange={setPage}
        />
  </div>
}
