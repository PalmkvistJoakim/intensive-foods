import React, { Component } from "react";
import { getCategories } from "../services/fakeCategoryService";
import { getFoods } from "../services/fakeFoodService";
import Favorite from "./common/Favorite";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategory: DEFAULT_CATEGORY,
  };

  componentDidMount() {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  }

  handleFavor = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleCategorySelect = (category) =>
    this.setState({ selectedCategory: category });

  render() {
    const { pageSize, selectedPage, categories, selectedCategory } = this.state;
    const { length: count } = this.state.foods;

    if (count === 0) return <p>There are no foods in the database.</p>;

    return (
      <div className="row mt-4">
        <div className="col-2">
          <ListGroup
            items={categories}
            selectedItem={selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          <p>Showing {count} foods in the database.</p>
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
                    <Favorite
                      onFavor={() => this.handleFavor(food)}
                      isFavorite={food.isFavorite}
                    />
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
          <Pagination
            itemCount={count}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }

  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
  };
}

export default Foods;
