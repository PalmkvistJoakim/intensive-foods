import React, { Component } from "react";
import { getFoods } from "../services/fakeFoodService";
import Favourite from "./Favourite";

class Foods extends Component {
  state = {
    foods: getFoods(),
  };

  render() {
    if (this.state.foods.length === 0)
      return <p>There are no foods in the database.</p>;

    return (
      <>
        <p>Showing {this.state.foods.length} foods in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.numberInStock}</td>
                <td>{food.price}</td>
                <td>
                  <Favourite />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(food)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
  };
}

export default Foods;
