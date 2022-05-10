import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
// import Posenet from './components/Posenet'
// import BaseCalibration from './components/Calibrations_not_used/BaseCalibration'
import Screenshot from "./components/Screenshot";
import Tracker from "./components/Tracker";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <BaseCalibration /> */}
      <Tracker />
    </div>
  );
};

export default App;
