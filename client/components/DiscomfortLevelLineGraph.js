import React, { useState, useEffect } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
  VictoryScatter,
  VictoryGroup,
} from "victory";
import moment from "moment";
import TimePeriodFilter from "./LineGraphTimeFilter";

const DiscomfortLevelLineGraph = (props) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setLoadingState(false);
  }, [props.dataSet]);

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
    switch (filterStatus) {
      case "Today":
        let currentDay = new Date().getDate();
        return graphDataMap.filter((survey) => {
          let surveyTime = new Date(survey.x);
          let formatedSurvey = surveyTime.getDate();
          return formatedSurvey === currentDay;
        });
      case "Past Month":
        let currentMonth = new Date().getMonth();
        return graphDataMap.filter((survey) => {
          let surveyMonth = new Date(survey.x);
          let formatedMonth = surveyMonth.getMonth();
          return formatedMonth === currentMonth;
        });
      case "Past Year":
        let currentYear = new Date().getYear();
        return graphDataMap.filter((survey) => {
          let surveyYear = new Date(survey.x);
          let formatedYear = surveyYear.getYear();
          return formatedYear === currentYear;
        });
      default:
        return graphDataMap;
    }
  };

  const finalLineArray = filteredGraphData();

  return (
    <div>
      {finalLineArray.length === 0 && loadingState === true ? (
        <h1>Loading data, please wait</h1>
      ) : finalLineArray.length <= 1 && loadingState === false ? (
        <h3 id="discomfort-level-line-loading-message">Not enough data</h3>
      ) : (
        <div>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            domain={{ y: [0, 1] }}
          >
            <VictoryLegend
              title="Discomfort Levels Over Time"
              orientation="horizontal"
              centerTitle
              height={75}
              data={[
                {
                  name: "",
                  symbol: { fill: "#E9EBE8" },
                },
              ]}
              style={
                ({ data: { fontSize: 1 } },
                {
                  title: { fontSize: 25, fontFamily: "clear_sans_thinregular" },
                })
              }
            />
            <VictoryAxis
              tickFormat={(x) => {
                switch (filterStatus) {
                  case "Today":
                    return moment(x).format("LT");
                  case "Past Month":
                    return moment(x).format("Do");
                  case "Past Year":
                    return moment(x).format("MMMM");
                  default:
                    return moment(x).format("MMM Do");
                }
              }}
              style={{
                axisLabel: { fontSize: 12, padding: 30, stroke: "#353535" },
                tickLabels: {
                  fontSize: 12,
                  padding: 5,
                  textAnchor: "end",
                  stroke: "#353535",
                },
                grid: { stroke: "#FFFFFF" },
                axis: { stroke: "#353535" },
              }}
              fixLabelOverlap={true}
            />
            <VictoryAxis
              label={"Discomfort Level"}
              dependentAxis
              style={{
                axisLabel: { fontSize: 12, padding: 30, stroke: "#353535" },
                tickLabels: {
                  fontSize: 12,
                  padding: 5,
                  textAnchor: "end",
                  stroke: "#353535",
                },
                grid: { stroke: "#FFFFFF" },
                axis: { stroke: "#353535" },
              }}
              tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
              tickFormat={(t) => t * 10}
            />
            <VictoryGroup>
              <VictoryLine
                data={finalLineArray}
                // width={400}
                style={{ data: { stroke: "#49C6B7" } }}
                y={(datum) => datum.y / 10}
              />
              <VictoryScatter
                data={finalLineArray}
                size={4}
                style={{ data: { fill: "#49C6B7" } }}
                y={(datum) => datum.y / 10}
              />
            </VictoryGroup>
          </VictoryChart>
          <TimePeriodFilter
            selected={filterStatus}
            onChange={filterChangeHandler}
          />
        </div>
      )}
    </div>
  );
};

export default DiscomfortLevelLineGraph;
