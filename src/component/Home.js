import React, { Component } from "react";
import About from "./About";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      msg: "电影",
    };
  }
  render() {
    return (
      <div>
        <About msg={this.state.msg}></About>
      </div>
    );
  }
}
