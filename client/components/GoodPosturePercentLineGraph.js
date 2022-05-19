import React, { useState } from "react";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLegend,
  VictoryScatter,
  VictoryGroup
} from "victory";
import { useSelector } from "react-redux";
import moment from "moment";

export default (props) => {
  const [filterStatus, setFilterStatus] = useState("");
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
    console.log(daysPoses)
    const goodPoses = daysPoses.filter((pose) => pose.type === "Good Posture")
    console.log('good poses', goodPoses)
    const goodPosePercent = goodPoses.length / daysPoses.length * 100
    const dataObj = {
      x: date,
      y: goodPosePercent
    }
    return dataObj
  })

  console.log('lineGraphData', lineGraphData)

  //eventual dataObj: {
  // x: day/month/year
  // y: % of Good posture / whole day
  //}

  const filterChangeHandler = (selectedStatus) => {
    setFilterStatus(selectedStatus);
  };

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryLegend
              title="Good Posture Trends"
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
          label="Time Taken"
          // padding={50}
          tickCount={12}
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
          style={{
            axisLabel: { fontSize: 12, padding: 30 },
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
        <VictoryAxis
          label={"Percent of Good Posture"}
          dependentAxis
          domain={[0, 100]}
          // padding={50}
          style={{
            axisLabel: { fontSize: 12, padding: 30 },
            tickLabels: { fontSize: 8, padding: 5 },
          }}
        />
        <VictoryGroup>
          <VictoryScatter
            data={lineGraphData}
            style={{ data: { fill:  "#A4C3B2" } }}
          />
          <VictoryLine
            data={lineGraphData}
            style={{ data: { stroke:  "#A4C3B2" } }}
          />
        </VictoryGroup>

      </VictoryChart>
    </div>
  )
}
