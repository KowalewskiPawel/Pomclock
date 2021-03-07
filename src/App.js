import "./App.css";
import Clock from "./components/Clock";
import Title from "./components/Title";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <Intro />
        <Title />
        <Clock />
        <Footer />
      </div>
    );
  }
}

export default App;
