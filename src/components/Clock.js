import React from "react";
import Bell from "./ring.mp3";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
      time: 60 * 25,
      break: 60 * 10,
      isBreak: false,
      timeLength: 25,
      breakLength: 10,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleIncrementTime = this.handleIncrementTime.bind(this);
    this.handleDecrementTime = this.handleDecrementTime.bind(this);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
    this.startTimer();
  }

  handleReset() {
    this.resetTimer();
    this.resetBreak();
  }

  handleIncrementTime() {
    this.setState((prevState) => ({
      time: prevState.time + 60,
      timeLength: prevState.timeLength + 1,
    }));
  }

  handleDecrementTime() {
    if (this.state.time > 60) {
      this.setState((prevState) => ({
        time: prevState.time - 60,
        timeLength: prevState.timeLength - 1,
      }));
    }
  }

  handleIncrementBreak() {
    this.setState((prevState) => ({
      break: prevState.break + 60,
      breakLength: prevState.breakLength + 1,
    }));
  }

  handleDecrementBreak() {
    if (this.state.break > 60) {
      this.setState((prevState) => ({
        break: prevState.break - 60,
        breakLength: prevState.breakLength - 1,
      }));
    }
  }

  startTimer() {
    const bell = new Audio(Bell);
    if (this.state.time > 0 && !this.state.isBreak) {
      if (this.state.isToggleOn) {
        this.counter = setInterval(() => {
          this.setState((prevState) => ({
            time: prevState.time - 1,
          }));
          if (this.state.time === 0) {
            bell.play();
            this.setState((state) => ({
              isToggleOn: !state.isToggleOn,
              isBreak: !state.isBreak,
            }));
            clearInterval(this.counter);
            this.resetTimer();
          }
        }, 1000);
      } else {
        clearInterval(this.counter);
      }
    }
    if (this.state.isBreak) {
      if (this.state.isToggleOn) {
        this.counter2 = setInterval(() => {
          this.setState((prevState) => ({
            break: prevState.break - 1,
          }));
          if (this.state.break === 0) {
            bell.play();
            this.setState((state) => ({
              isToggleOn: !state.isToggleOn,
              isBreak: !state.isBreak,
            }));
            clearInterval(this.counter2);
            this.resetBreak();
          }
        }, 1000);
      } else {
        clearInterval(this.counter2);
      }
    }
  }

  resetTimer() {
    this.setState({
      time: 60 * 25,
      timeLength: 25,
    });
  }

  resetBreak() {
    this.setState({
      break: 60 * 10,
      breakLength: 10,
    });
  }

  render() {
    return (
      <div>
        <h1 className="study">
          {!this.state.isBreak ? "It's study time" : "It's break time"}
        </h1>
        <div className="timer">
          <div id="minutes">
            {!this.state.isBreak
              ? Math.floor(this.state.time / 60)
              : Math.floor(this.state.break / 60)}
          </div>
          <div>:</div>
          <div id="seconds">
            {!this.state.isBreak
              ? String(Math.floor(this.state.time % 60)).padStart(2, "0")
              : String(Math.floor(this.state.break % 60)).padStart(2, "0")}
          </div>
        </div>
        <div className="buttons">
          <div id="start" onClick={this.handleClick}>
            {this.state.isToggleOn ? "START" : "STOP"}
          </div>
          <div id="reset" onClick={this.handleReset}>
            RESET
          </div>
        </div>
        <div className="change">
          <label>TIME</label>
          <div id="incrementTime" onClick={this.handleIncrementTime}>
            +
          </div>
          <p id="study">{this.state.timeLength}</p>
          <div id="decrementTime" onClick={this.handleDecrementTime}>
            -
          </div>
          <label>BREAK</label>
          <div id="incrementBreak" onClick={this.handleIncrementBreak}>
            +
          </div>
          <p id="breakTime">{this.state.breakLength}</p>
          <div id="decrementBreak" onClick={this.handleDecrementBreak}>
            -
          </div>
        </div>
      </div>
    );
  }
}
