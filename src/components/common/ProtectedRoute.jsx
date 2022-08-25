import React from "react";
import authService from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ path, component: Component, render }) {
  return (
    <Route
      path={path}
      render={(props) => {
        if (!authService.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location.pathname },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
