import React, { Component } from "react";
import Foods from "./components/Foods";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import FoodsDetails from "./components/FoodsDetails";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/tablebody/:name" component={FoodsDetails} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/not-found" component={NotFound} />
            <Route exact path="/" component={Foods} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
