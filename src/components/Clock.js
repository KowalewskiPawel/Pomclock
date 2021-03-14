import React from "react";
import Bell from "./ring.mp3";
import White from "./noise.ogg";
import ModalRules from "./ModalRules";
import moment from "moment";
import { Helmet } from "react-helmet";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);

    const dateCreate = moment().format("MMM Do YY");
    this.state = {
      isToggleOn: true,
      time: 60 * 25,
      break: 60 * 10,
      isBreak: false,
      timeLength: 25,
      breakLength: 10,
      whiteNoise: false,
      sessions: [],
      date: dateCreate,
    };
    this.audioRef = React.createRef();
  }

  handleClick = () => {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
    this.startTimer();
  };

  handleReset = () => {
    this.resetTimer();
    this.resetBreak();
  };

  handleIncrementTime = () => {
    if (this.state.time < 30 * 60) {
      this.setState((prevState) => ({
        time: prevState.time + 60,
        timeLength: prevState.timeLength + 1,
      }));
    }
  };

  handleDecrementTime = () => {
    if (this.state.time > 15 * 60) {
      this.setState((prevState) => ({
        time: prevState.time - 60,
        timeLength: prevState.timeLength - 1,
      }));
    }
  };

  handleIncrementBreak = () => {
    if (this.state.break < 30) {
      this.setState((prevState) => ({
        break: prevState.break + 60,
        breakLength: prevState.breakLength + 1,
      }));
    }
  };

  handleDecrementBreak = () => {
    if (this.state.break > 60) {
      this.setState((prevState) => ({
        break: prevState.break - 60,
        breakLength: prevState.breakLength - 1,
      }));
    }
  };

  startTimer = () => {
    const bell = new Audio(Bell);
    const timeLast = this.state.timeLength;
    const breakLast = this.state.breakLength;
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
            this.setState({
              time: timeLast * 60,
            });
            this.setState(
              (prevState) => ({
                sessions: [...prevState.sessions, "🍅"],
              }),
              () => {
                localStorage.setItem(
                  "sessions",
                  JSON.stringify(this.state.sessions)
                );
              }
            );
            this.saveLocal();
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
            this.saveLocal();
            clearInterval(this.counter2);
            this.setState({
              break: breakLast * 60,
            });
          }
        }, 1000);
      } else {
        clearInterval(this.counter2);
      }
    }
  };

  resetTimer = () => {
    this.setState({
      time: 60 * 25,
      timeLength: 25,
    });
  };

  resetBreak = () => {
    this.setState({
      break: 60 * 10,
      breakLength: 10,
    });
  };

  playWhiteNoise = () => {
    if (!this.state.whiteNoise) {
      this.setState({
        whiteNoise: true,
      });
      this.audioRef.current.addEventListener("ended", () => {
        this.audioRef.current.play();
      });
      this.audioRef.current.play();
    }
    if (this.state.whiteNoise) {
      this.audioRef.current.pause();
      this.setState({
        whiteNoise: false,
      });
    }
  };

  saveLocal = () => {
    localStorage.setItem("pomoDay", JSON.stringify(this.state.date));
  };

  componentDidMount() {
    const sessions = localStorage.getItem("sessions");
    const dateDay = localStorage.getItem("pomoDay");
    if (sessions) {
      if (JSON.parse(dateDay) === this.state.date) {
        this.setState({ sessions: JSON.parse(sessions) });
      }
    }
  }

  render() {
    const studyTime = !this.state.isBreak
      ? `${Math.floor(this.state.time / 60)} : ${String(
          Math.floor(this.state.time % 60)
        ).padStart(2, "0")}`
      : `${Math.floor(this.state.break / 60)} : ${String(
          Math.floor(this.state.break % 60)
        ).padStart(2, "0")}`;
    return (
      <div>
        <Helmet>
          <title>
            Minidoro Clock {!this.state.isToggleOn ? studyTime : ""}
          </title>
        </Helmet>
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
          <div
            id="toogleSession"
            onClick={() => {
              this.setState({
                isBreak: !this.state.isBreak,
                isToggleOn: true,
                time: this.state.timeLength * 60,
                break: this.state.breakLength * 60,
              });
              clearInterval(this.counter);
              clearInterval(this.counter2);
            }}
          >
            {!this.state.isBreak ? "Break Time" : "Study Time"}
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
        <div className="settings">
          <div id="noise" onClick={this.playWhiteNoise}>
            <audio ref={this.audioRef} src={White} />
            {!this.state.whiteNoise ? " 🔉 White Noise" : "🔇 White Noise"}
          </div>
          <ModalRules />
        </div>
        <div id="achievements">
          <h2>
            {this.state.sessions.length === 0
              ? "Today you haven't finished any session yet"
              : this.state.sessions.length === 1
              ? "Today you have finished 1 session"
              : "Today you have finished " +
                this.state.sessions.length +
                " sessions"}
          </h2>
          <p id="pomodoros">{this.state.sessions.join(" ")}</p>
        </div>
      </div>
    );
  }
}
