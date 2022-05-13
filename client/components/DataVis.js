import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../store/surveyDataSet";
import PainAreaChart from "./PainAreaChart";
import PostureTypePie from "./PostureTypePie";
import DiscomfortLevelLineGraph from "./DiscomfortLevelLineGraph";
import StretchList from "./StretchList";

export default (props) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const dataSet = useSelector((state) => state.dataSet);

  const sortedSet = dataSet.sort((a, b) => {
    return a.id - b.id;
  });

  useEffect(() => {
    const fetchData = () => {
      if (userId) {
        dispatch(getUserData(userId));
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div>
      <form>
        <label>See charts : </label>
        <select>
          <option value="all"> - </option>
          <option value="discomfort_level">Discomfort Levels</option>
          <option value="discomfort_areas">Discomfort Areas</option>
          <option value="posture_breakdown">Posture Breakdown</option>
        </select>

        <input type="submit" value="Submit" />
      </form>
      <DiscomfortLevelLineGraph dataSet={sortedSet} />
      <PainAreaChart dataSet={sortedSet} />
      <PostureTypePie />
      <StretchList />
    </div>
  );
};
