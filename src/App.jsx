import React, { Component } from "react";
import Foods from "./components/Foods";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import FoodForm from "./components/FoodForm";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/foods/:id" component={FoodForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/foods" component={Foods} />
            <Route exact path="/" component={Foods} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
