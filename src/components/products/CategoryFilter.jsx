import { useState, useEffect } from "react";
import api from "../../api"
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export function CategoryFilter({ onCategoryFilter, length }) {
    const [categories, setCategories] = useState([]);
    let { category } = useParams();
    useEffect(() => {
        api.get("/products/categories")
            .then(data => setCategories(data.data))
            .catch(err => toast.error(err || "Failed to load categories"));
    }, []);
    useEffect(() => {
        onCategoryFilter(category || "All");
    }, [category]);
    return <>
        <h4 className="text-gray-800 font-semibold text-lg mb-4">
        There {length !== 1 ? "are" : "is"} <span className="text-green-600">{length}</span> book{length !== 1 ? "s" : ""} in this category
        </h4>
        <ul className="flex flex-wrap gap-2 mb-4">
            <li className="mb-2">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        isActive ? "bg-green-600 text-white px-3 py-1 rounded" : "bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                    }
                >
                    All
                </NavLink>
            </li>
            {categories.map(({ id, category: name }) => (
                <li key={id} className="mb-2">
                    <NavLink
                        to={`/products/category/${name}`}
                        className={({ isActive }) =>
                            isActive ? "bg-green-600 text-white px-3 py-1 rounded" : "bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
                        }
                    >
                        {name}
                    </NavLink>
                </li>
            ))}
        </ul>
    </>;
}