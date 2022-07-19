import React, { Component } from "react";
import Foods from "./components/Foods";
import Pagination from "./components/Pagination";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Foods />
        <Pagination />
      </div>
    );
  }
}

export default App;
