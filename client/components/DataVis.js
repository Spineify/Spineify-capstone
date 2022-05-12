import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";
import { getUserData } from "../store/surveyDataSet";
import moment from "moment";
import PainAreaChart from "./PainAreaChart";
import PostureTypePie from "./PostureTypePie";
import TimePeriodFilter from "./LineGraphTimeFilter";
import StretchList from "./StretchList";

export default (props) => {
  const dispatch = useDispatch();
  // const [surveyData, setSurveyData] = useState([]);
  const userId = useSelector((state) => state.auth.id);
  const dataSet = useSelector((state) => state.dataSet);
  const [filterStatus, setFilterStatus] = useState("");

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

  const graphDataMap = sortedSet.map((survey) => {
    let surveyTime = new Date(survey.createdAt);
    // console.log("SURVEYITEM", surveyTime.getDate());
    const dataObj = {
      x: survey.createdAt,
      y: Number(survey.discomfort_level),
    };

    return dataObj;
  });

  const filterChangeHandler = (selectedStatus) => {
    setFilterStatus(selectedStatus);
  };

  let filteredGraphData = () => {
    let currentDate = new Date();
    console.log("CURRENT DATE", currentDate.getDate());
    console.log("FILTER", filterStatus); // number 12
    //getMonth() = number 4 (January = 0)
    if (filterStatus === "Today") {
      let currentDay = new Date().getDate();
      return graphDataMap.filter((survey) => {
        let surveyTime = new Date(survey.createdAt).getDate();
        console.log("Survey DATE", surveyTime);
        surveyTime === currentDay;
      });
    }
    // } else if(filterStatus === 'Past Month'){
    //   let currentWeek = new Date().getMonth()
    //   return graphDataMap.filter(survey => {
    //     let surveyMonth = new Date(survey.createdAt)
    //   })
    // }
    else {
      return graphDataMap;
    }
  };

  filteredGraphData();

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
      {graphDataMap.length === 0 ? (
        <h1>Loading data, please wait</h1>
      ) : (
        <div>
          <TimePeriodFilter
            selected={filterStatus}
            onChange={filterChangeHandler}
          />
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryAxis
              label="Time Taken"
              padding={50}
              tickFormat={(x) => moment(x).format("MMM Do")}
              fixLabelOverlap={true}
              // range={} this will be used when we filter time ranges
              style={{
                axisLabel: { fontSize: 12, padding: 30 },
                tickLabels: { fontSize: 8, padding: 5 },
              }}
            />
            <VictoryAxis
              label={"Discomfort Level"}
              dependentAxis
              domain={[0, 10]}
              padding={50}
              style={{
                axisLabel: { fontSize: 12, padding: 30 },
                tickLabels: { fontSize: 8, padding: 5 },
              }}
            />
            <VictoryStack colorScale={"warm"}>
              <VictoryLine data={filteredGraphData()} width={400} />
            </VictoryStack>
          </VictoryChart>
        </div>
      )}
      <PainAreaChart dataSet={sortedSet} />
      <PostureTypePie />
      <StretchList />
    </div>
  );
};
