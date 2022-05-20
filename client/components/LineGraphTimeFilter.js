import React from "react";

const TimePeriodFilter = (props) => {
  return (
    <div>
      <label>Select Time Period: </label>
      <select
        name="status"
        onChange={(e) => props.onChange(e.target.value)}
        value={props.selected}
      >
        <option value="">All</option>
        <option value="Today">Today</option>
        <option value="Past Month">Past Month</option>
        <option value="Past Year">Past Year</option>
      </select>
    </div>
  );
};

export default TimePeriodFilter;
