import React, { useState, useEffect } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
  VictoryScatter,
  VictoryGroup
} from "victory";
import moment from "moment";
import TimePeriodFilter from "./LineGraphTimeFilter";
import { useSelector } from "react-redux";

const DiscomfortLevelLineGraph = (props) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setLoadingState(false)
  }, [props.dataSet])

  const graphDataMap = props.dataSet.map((survey) => {
    const dataObj = {
      x: survey.createdAt,
      y: Number(survey.discomfort_level),
    };

    return dataObj;
  });

  const posesData = useSelector((state) => state.posesReducer)

  const sortedPoses = posesData.sort((a, b) => a.id - b.id)

  let poseDays = {}
  let poseDates = []
  const mappedPoses = sortedPoses.map((pose) => {
    const date = new Date(pose.createdAt)

    //transforming the data to become more useful
    //start by sorting the number of dates we're working with into an object, and the dates themselves into an array
    if (!poseDays[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`]) {
      poseDays[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] = []
      poseDays[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`].push(pose)
      poseDates.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    } else {
      poseDays[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`].push(pose)
    }
  })

  //map through the date array to access the pose data
  //within the date object to to calculations and then present it in the way that Victory wants
  const lineGraphData = poseDates.map((date) => {
    const daysPoses = poseDays[date];
    const goodPoses = daysPoses.filter((pose) => pose.type === "Good Posture")
    const goodPosePercent = goodPoses.length / daysPoses.length * 100
    const dataObj = {
      x: date,
      y: goodPosePercent
    }
    return dataObj
  })
console.log('goodPosture linegraph data', lineGraphData)


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
  console.log('discomfortLineArray', finalLineArray)

  return (
    <div>
      {finalLineArray.length === 0 && loadingState === true ? (
        <h1>Loading data, please wait</h1>
      ) : finalLineArray.length <= 1 && loadingState === false ? <h3 id="discomfort-level-line-loading-message">Not enough data</h3> : (
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
              height="auto"
              data={[{
                name: '', symbol: { fill: '#D9D9D9' }
              }
              ]}
              style={
                ({ data: { fontSize: 1 } }, { title: { fontSize: 25 } })
              }
            />
            <VictoryAxis
              //label="Time Taken"
              // padding={50}
              // tickCount={12}
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
              fixLabelOverlap={true}
              // style={{
              //   axisLabel: { fontSize: 12, padding: 30 },
              //   tickLabels: { fontSize: 8, padding: 5 },
              // }}
            />
            <VictoryAxis
              //label={"Discomfort Level"}
              dependentAxis
              //domain={[0, 10]}
              // padding={50}
              style={{
                axisLabel: { fontSize: 12, padding: 30 },
                tickLabels: { fontSize: 8, padding: 5, textAnchor: "end" },
              }}
              tickValues={[.2, .4, .6, .8, 1]}
              tickFormat={(t) => t * 10}
            />
            <VictoryAxis
              //label={"Percent of Good Posture"}
              dependentAxis
              domain={[0, 100]}
              // padding={50}
              style={{
                axisLabel: { fontSize: 12, padding: 30 },
                tickLabels: { fontSize: 8, padding: 5, textAnchor: "start" },
                ticks: { padding: -20 }
              }}
              tickValues={[.2, .4, .6, .8, 1]}
              tickFormat={(t) => t * 100}
              offsetX={300}
            />
            <VictoryGroup>
              <VictoryLine
                data={lineGraphData}
                style={{ data: { stroke: "#A4C3B2" } }}
                y={(datum) => datum.y / 100}
              />
              <VictoryLine
                data={finalLineArray}
                // width={400}
                style={{ data: { stroke: "#49C6B7" } }}
                y={(datum) => datum.y / 10}
              />
              {/* <VictoryScatter
                data={finalLineArray}
                size={4}
                style={{ data: { fill: "#49C6B7" } }}
                y={(datum) => datum.y / 10}
              />
              <VictoryScatter
                data={lineGraphData}
                style={{ data: { fill: "#A4C3B2" } }}
                y={(datum) => datum.y / 100}
              /> */}

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
