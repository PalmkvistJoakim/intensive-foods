import React, { Component } from "react";

class Favorite extends Component {
  render() {
    let classes = "fa-star fa-";
    classes += this.props.isFavorite ? "solid" : "regular";

    return (
      <div>
        <i
          style={{ cursor: "pointer" }}
          className={classes}
          onClick={this.props.onFavor}
        ></i>
      </div>
    );
  }
}

export default Favorite;
