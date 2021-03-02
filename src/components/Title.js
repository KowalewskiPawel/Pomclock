import { render } from "@testing-library/react";
import React from "react";
import logo from "./logopo.png";

export default class Title extends React.Component {
  render() {
    return (
      <div className="Title">
        <img src={logo} alt="Minidoro" />
        <h1>Minidoro Clock</h1>
      </div>
    );
  }
}
