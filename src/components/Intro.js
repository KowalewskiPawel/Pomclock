import React from "react";
import logo from "./logopo.png";
import googlebadge from "./googleplaybadge.png";
import tryItButton from "./tryIt.png";

export default class Intro extends React.Component {
  render() {
    return (
      <div className="intro">
        <div className="introtitle">
          <h1>
            Minidoro Clock <img id="logosmall" src={logo} />
          </h1>
          <p>minimalism + pomodoroTechnique = productivity</p>
          <div id="introbtns">
            <a
              onClick={() => {
                window.scrollTo({
                  top: 700,
                  left: 0,
                  behavior: "smooth",
                });
              }}
            >
              <img
                id="badge"
                src={tryItButton}
                alt="Try it online"
              />
             </a>
            <p id="or">OR</p>
            <a
              href="https://play.google.com/store/apps/details?id=com.practicalearning.minidoroclock"
              target="_blank"
            >
              <img
                id="badge"
                src={googlebadge}
                alt="Get it on Google Play Store"
              />
            </a>
          </div>
        </div>
        <img id="MinidoroLogo" src={logo} alt="Minidoro" />
      </div>
    );
  }
}
