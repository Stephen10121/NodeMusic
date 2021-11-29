import "./Landing.css";
import React/*, { useState, useRef, useEffect }*/ from "react";

const LandingPage = (props) => {

    return (
      <div className="LandingPage">
          <button id="music" onClick={props.change.bind({name:"musicPlayer"})}>Music Player</button>
          <button id="setting" onClick={props.change.bind({name:"settings"})}>Settings</button>
      </div>
    );
  }
  
  export default LandingPage;