import React from "react";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

const PaginationBox = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-4 px-6 flex justify-end items-center shadow-custom-lite bg-white border border-custom-gray-border rounded-md">
      <div className="flex flex-row gap-6 items-center justify-end">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => handlePageClick(currentPage - 1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft /> Prev
        </div>

        <div className="flex flex-row gap-2">
          {pageNumbers.map((pageNumber) => (
            <div
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`size-8 rounded-md ${
                pageNumber === currentPage
                  ? "bg-custom-violet text-white"
                  : "bg-white hover:bg-custom-violet hover:text-white transition-colors duration-500 text-custom-violet"
              } border-custom-violet border flex justify-center items-center text-base font-medium cursor-pointer`}
            >
              {pageNumber}
            </div>
          ))}
        </div>

        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next <MdOutlineKeyboardDoubleArrowRight />
        </div>
      </div>
    </div>
  );
};

export default PaginationBox;
