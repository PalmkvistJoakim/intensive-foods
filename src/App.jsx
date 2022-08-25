import React, { Component } from "react";
import Foods from "./components/Foods";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers";
import Orders from "./components/Orders";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import FoodForm from "./components/FoodForm";
import Logout from "./components/Logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.setState({ user: auth.getCurrentUser() });
  }

  render() {
    const { user } = this.state;

    return (
      <>
        <NavBar user={user} />
        <div className="container">
          <Switch>
            <ProtectedRoute path="/foods/:id" component={FoodForm} />
            <Route
              path="/foods"
              render={(props) => <Foods {...props} user={user} />}
            />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
            <Redirect exact from="/" to="/foods" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
