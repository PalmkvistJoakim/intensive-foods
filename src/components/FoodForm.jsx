import React from "react";
import { getCategories } from "../services/categoryService";
import { getFood, saveFood } from "../services/foodService";
import Joi from "joi";
import Form from "./common/Form";

class FoodForm extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      categoryId: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    categories: [],
  };

  schema = Joi.object({
    _id: Joi.allow(""),
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
  });

  componentDidMount() {
    this.populateCategories();
    this.populateFood();
  }

  async populateCategories() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  async populateFood() {
    const id = this.props.match.params.id;
    if (id === "new") return;

    const { data } = await getFood(id);
    if (!data) return this.props.history.replace("/not-found");
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(data) {
    return {
      _id: data._id,
      name: data.name,
      categoryId: data.category._id,
      numberInStock: data.numberInStock,
      price: data.price,
    };
  }

  doSubmit = async () => {
    await saveFood(this.state.data);
    return this.props.history.push("/foods");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderSelect("categoryId", "Category", this.state.categories)}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
