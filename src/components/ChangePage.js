import { render } from "@testing-library/react";

export default function ChangePage({ pagination, pageRender }) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a
            className={`page-link ${
              pagination.has_pre ? "active" : "disabled"
            }`}
            href="/"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              pageRender(pagination.current_page - 1);
            }}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {[...new Array(pagination.total_pages)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className="page-item" key={`${i}_page`}>
            <a
              className={`page-link ${
                i + 1 == pagination.current_page && "active"
              }`}
              href="/"
              onClick={(e) => {
                e.preventDefault();
                pageRender(i + 1);
              }}
            >
              {i + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a
            className={`page-link ${
              pagination.has_next ? "active" : "disabled"
            }`}
            href="/"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              pageRender(pagination.current_page + 1);
            }}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
