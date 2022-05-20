import React, { useEffect, useState } from "react";
import UserHomeDash from "./UserHomeDash";
//import { connect, useDispatch, useSelector } from "react-redux";

function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <div>
      <span>{date.toLocaleTimeString().replace(/:\d+ /, " ")}</span>
      {/* <UserHomeDash /> */}
    </div>
  );
}
export default Clock;
