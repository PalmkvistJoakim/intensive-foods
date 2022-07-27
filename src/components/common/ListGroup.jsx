import React from "react";

function ListGroup({ items, selectedItem, onItemSelect }) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          ket={item._id}
          style={{ cursor: "pointer" }}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

export default ListGroup;
