import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ current, total, limit, onPageChange }) {
    
    const totalPages = Math.ceil(total / limit);

    if (totalPages === 0 || total <= limit) { return null; }

    const handlePrev = () => {
        onPageChange(Math.max(1, current - 1));
    }

    const handleNext = () => {
        onPageChange(Math.min(current + 1, totalPages));
    }

    const renderPages = () => {
        const pages = [];
        const st = Math.max(current - 1, 1);
        const end = Math.min(current + 1, totalPages);
        for (let i = st; i <= end; ++i) {
            pages.push(
                <button 
                    key={i} 
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-1 border rounded mx-1 ${
                        i === current ? "bg-green-500 text-white" : "bg-white text-black"
                      }`}
                >
                    {i}
                </button>
            )
        }
        return pages;
    }

    return (
        <div className="flex justify-center items-center my-4">
            
            { current > 1 && 
                <button
                    onClick={handlePrev}
                    className="px-3 py-1 border rounded mx-1 disabled:opacity-50"
                >
                    <ChevronLeft size={20} />
                </button>
            }
            
            { renderPages() }
            
            { current < totalPages &&
                <button
                    onClick={handleNext}
                    className="px-3 py-1 border rounded mx-1 disabled:opacity-50"
                    >
                    <ChevronRight size={20} />
                </button>
            }

        </div>
    );
}