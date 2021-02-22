import "./App.css";
import Clock from "./components/Clock";
import Title from "./components/Title";
import Footer from "./components/Footer";
import React from "react";

class App extends React.Component {
  render() {
    return (
      <div>
        <Title />
        <Clock />
        <Footer />
      </div>
    );
  }
}

export default App;
