import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Tracker from "./components/Tracker";
import Sidebar from "./components/Sidebar";
import { getModel } from "./store/tmModel";
import { logout } from "./store";

const App = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  //load teachable machine model
  useEffect(() => {
    dispatch(getModel());
  }, []);

  return (
    <div className="app-container">
      {isLoggedIn && <Sidebar className="sidebar" />}

      <div className={isLoggedIn ? "body-content" : "body-content-signin"}>
        <Routes />
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(App);
