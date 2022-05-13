import React from "react";

const TimePeriodFilter = (props) => {
  return (
    <div>
      <select
        name="status"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.selected}
      >
        <option value="">Select time period</option>
        <option value="Today">Today</option>
        <option value="Past Week">Past Week</option>
        <option value="Past Month">Past Month</option>
        <option value="Past Year">Past Year</option>
      </select>
    </div>
  );
};

export default TimePeriodFilter;
