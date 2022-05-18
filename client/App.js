import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Tracker from "./components/Tracker";
import Sidebar from "./components/Sidebar";
import { getModel } from "./store/tmModel";

const App = () => {
  const dispatch = useDispatch();

  //load teachable machine model
  useEffect(() => {
    dispatch(getModel());
  }, []);

  return (
    <div className="app-container">
      {/* <Navbar /> */}
      <Sidebar className="sidebar" />

      <div className="body-content">
        <Routes />
        <Tracker />
      </div>
    </div>
  );
};

export default App;
