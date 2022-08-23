import React from "react";
import axios from "axios";
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

  async componentDidMount() {
    const { data: categories } = await axios.get(
      "http://localhost:8000/api/categories"
    );
    this.setState({ categories });

    const id = this.props.match.params.id;
    if (id === "new") return;

    const { data } = await axios.get(`http://localhost:8000/api/foods/${id}`);
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

  database(data) {
    return {
      name: data.name,
      categoryId: data.categoryId,
      numberInStock: data.numberInStock,
      price: data.price,
    };
  }

  doSubmit = async () => {
    const data = this.database(this.state.data);
    if (this.state.data._id) {
      await axios.put(
        `http://localhost:8000/api/foods/${this.state.data._id}`,
        data
      );
    } else {
      await axios.post("http://localhost:8000/api/foods", data);
    }
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
