import React, { Component } from "react";

class Favourite extends Component {
  state = {
    star: false,
  };

  render() {
    const styles = {
      cursor: "pointer",
    };

    return (
      <div className={this.getBadgeClasses()}>
        <i style={styles} className="fa-star" onClick={this.handleClick}></i>
      </div>
    );
  }

  handleClick = () => {
    this.setState({ star: this.state.star !== true });
  };

  getBadgeClasses = () => {
    return this.state.star ? "fa-solid" : "fa-regular";
  };
}

export default Favourite;
