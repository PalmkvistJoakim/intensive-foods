import React, { Component } from "react";

class FoodsDetails extends Component {
  handleSave = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Food Form {this.props.match.params.name}</h1>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default FoodsDetails;
