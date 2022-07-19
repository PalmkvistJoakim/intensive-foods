import React, { Component } from "react";

class Pagination extends Component {
  state = {
    page: false,
  };
  render() {
    const styles = {
      cursor: "pointer",
    };
    return (
      <div>
        <ul className="pagination pagination-sm" style={styles}>
          <li className={this.classes()} onClick={this.activeButton}>
            <span className="page-link">1</span>
          </li>
          <li className={this.classes()} onClick={this.activeButton}>
            <span className="page-link">2</span>
          </li>
          <li className={this.classes()} onClick={this.activeButton}>
            <span className="page-link">3</span>
          </li>
        </ul>
      </div>
    );
  }

  activeButton = () => {
    this.setState({ page: this.state.page !== true });
  };

  classes = () => {
    return this.state.page ? "page-item active" : "page-item disabled";
  };
}

export default Pagination;
