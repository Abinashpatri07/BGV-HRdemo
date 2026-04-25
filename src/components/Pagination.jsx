import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPages = () => {
    let pages = [];

    if (totalPages <= 7) {
      return [...Array(totalPages).keys()].map((i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    // ✅ REMOVE DUPLICATES
    return [...new Set(pages)];
  };

  const pages = getPages();

  return (
    <div className="flex items-center justify-between ">
      
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{currentPage}</span> out of{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Pages */}
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}  // ✅ UNIQUE KEY
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-gray-500 text-white"
                  : "bg-white"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;