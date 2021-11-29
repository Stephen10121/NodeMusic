import React, { useState } from "react";
import ChooseRender from "./Choose/Choose";
import './App.css';

const App = () => {
  const [mainLocation, changeLocation] = useState("");
  const updateLocation = (location) => {
    let newLocation = location.target.id;
    if (newLocation !== mainLocation) {
      changeLocation(newLocation);
    }
  }

  return(
    <div className="App">
      <div className="main-box">
        <ChooseRender place={mainLocation} updateLocation={updateLocation}/>
      </div>
    </div>
  );
}

export default App;
