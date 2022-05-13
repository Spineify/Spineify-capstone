import React, { useState } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
} from "victory";
import moment from "moment";
import TimePeriodFilter from "./LineGraphTimeFilter";

const DiscomfortLevelLineGraph = (props) => {
  const [filterStatus, setFilterStatus] = useState("");

  const graphDataMap = props.dataSet.map((survey) => {
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
    if (filterStatus === "Today") {
      let currentDay = new Date().getDate();
      return graphDataMap.filter((survey) => {
        let surveyTime = new Date(survey.x);
        let formatedSurvey = surveyTime.getDate();
        return formatedSurvey === currentDay;
      });
    } else if (filterStatus === "Past Month") {
      let currentMonth = new Date().getMonth();
      return graphDataMap.filter((survey) => {
        let surveyMonth = new Date(survey.x);
        let formatedMonth = surveyMonth.getMonth();
        return formatedMonth === currentMonth;
      });
    } else if (filterStatus === "Past Year") {
      let currentYear = new Date().getYear();
      return graphDataMap.filter((survey) => {
        let surveyYear = new Date(survey.x);
        let formatedYear = surveyYear.getYear();
        return formatedYear === currentYear;
      });
    } else {
      return graphDataMap;
    }
  };

  const finalLineArray = filteredGraphData();

  return (
    <div>
      {finalLineArray.length === 0 ? (
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
              tickCount={12}
              tickFormat={(x) => {
                if (!filterStatus) {
                  return moment(x).format("MMM Do");
                } else if (filterStatus === "Today") {
                  return moment(x).format("LT");
                } else if (filterStatus === "Past Month") {
                  return moment(x).format("Do");
                } else if (filterStatus === "Past Year") {
                  return moment(x).format("MMMM");
                }
              }}
              fixLabelOverlap={true}
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
              <VictoryLine
                data={finalLineArray}
                width={400}
                style={{ data: { stroke: "#49C6B7" } }}
              />
            </VictoryStack>
          </VictoryChart>
        </div>
      )}
    </div>
  );
};

export default DiscomfortLevelLineGraph;
