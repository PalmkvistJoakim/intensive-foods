import React from "react";
import Joi from "joi";
import Form from "./common/Form";
import httpService from "../services/httpService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().allow("").label("Name"),
  });

  // doSubmit = async () => {
  //   const data = {
  //     name: this.state.name,
  //     email: this.state.username,
  //     password: this.state.password,
  //   };
  //   await http.post("http://localhost:8000/api/users", data);
  // };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;
