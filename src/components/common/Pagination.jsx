import React from "react";

function Pagination(props) {
  const { itemCount, pageSize, selectedPage, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount === 1) return null;

  const pages = range(1, pageCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li
          key={page}
          className={page === selectedPage ? "page-item active" : "page-item"}
        >
          <button onClick={() => onPageChange(page)} className="page-link">
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;

function range(start, end) {
  const result = [];

  for (let i = start; i <= end; i++) result.push(i);

  return result;
}
