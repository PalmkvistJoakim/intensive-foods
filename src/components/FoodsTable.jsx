import React, { Component } from "react";
import Table from "./common/Table";
import Favorite from "./common/Favorite";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class FoodsTable extends Component {
  columns = [
    {
      label: "Name",
      path: "name",
      content: (food) => <Link to={`/foods/${food._id}`}>{food.name}</Link>,
    },
    { label: "Category", path: "category.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Price", path: "price" },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          onFavor={() => this.props.onFavor(food)}
          isFavorite={food.isFavorite}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (food) => (
      <button
        onClick={() => this.props.onDelete(food)}
        className="btn btn-danger"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();

    const user = auth.getCurrentUser();

    if (user?.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { foods, sortColumn, onSort } = this.props;
    return (
      <Table
        data={foods}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FoodsTable;
