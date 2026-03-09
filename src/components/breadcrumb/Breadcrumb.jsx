import React from "react";
import "./breadcrumb.css";

function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, idx) => {
        const isActive = idx === items.length - 1;
        return (
        <span key={idx} className="breadcrumb-item">
          <button
            type="button"
            className={`breadcrumb-link ${isActive ? "breadcrumb-active" : ""}`}
            onClick={() => {
              if (typeof item.onClick === "function") item.onClick(idx);
            }}
          >
            {item.label}
          </button>
          {idx < items.length - 1 && <span className="breadcrumb-separator">/</span>}
        </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
