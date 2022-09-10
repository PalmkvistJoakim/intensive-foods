import React, { Component } from "react";
import { getCategories } from "../services/categoryService";
import { getFoods, deleteFood } from "../services/foodService";
import _ from "lodash";
import { Link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import Pagination from "./common/Pagination";
import FoodsTable from "./FoodsTable";
import SearchBox from "./SearchBox";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    searchQuery: "",
    selectedCategory: DEFAULT_CATEGORY,
    sortColumn: { path: "name", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = [DEFAULT_CATEGORY, ...data];
    const { data: foods } = await getFoods();
    this.setState({ foods, categories });
  }

  handleFavor = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  handleDelete = async (food) => {
    const originalFoods = this.state.foods;
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });

    try {
      await deleteFood(food._id);
    } catch (error) {
      console.log(error);
      this.setState({ foods: originalFoods });
    }
  };

  handleSearch = (searchQuery) =>
    this.setState({ searchQuery, selectedCategory: DEFAULT_CATEGORY });

  handleSort = (sortColumn) => this.setState({ sortColumn });

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleCategorySelect = (category) =>
    this.setState({
      selectedCategory: category,
      selectedPage: 1,
      searchQuery: "",
    });

  getPaginatedFoods() {
    const {
      pageSize,
      selectedPage,
      searchQuery,
      selectedCategory,
      sortColumn,
      foods: allFoods,
    } = this.state;

    let filteredFoods = allFoods;

    if (selectedCategory._id) {
      filteredFoods = allFoods.filter(
        (f) => f.category._id === selectedCategory._id
      );
    } else if (searchQuery) {
      filteredFoods = allFoods.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sortedFoods = _.orderBy(
      filteredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );

    const foods = paginate(sortedFoods, selectedPage, pageSize);

    return { foods, filteredCount: filteredFoods.length };
  }

  renderButton(label) {
    return <button className="btn btn-primary mb-3">{label}</button>;
  }

  render() {
    const {
      pageSize,
      selectedPage,
      selectedCategory,
      searchQuery,
      categories,
      sortColumn,
      foods: allFoods,
    } = this.state;
    const { length: count } = allFoods;

    if (count === 0) return <p>There are no foods in the database.</p>;

    const { foods, filteredCount } = this.getPaginatedFoods();

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
          {this.props.user && (
            <Link className="btn btn-primary mb-3" to="/foods/new">
              New Food
            </Link>
          )}
          <p>Showing {filteredCount} foods in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <FoodsTable
            foods={foods}
            onFavor={this.handleFavor}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={filteredCount}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Foods;
