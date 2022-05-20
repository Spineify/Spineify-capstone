import React, { useEffect, useState } from "react";

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
      <span className="clock">
        {date.toLocaleTimeString().replace(/:\d+ /, " ")}
      </span>
    </div>
  );
}
export default Clock;
