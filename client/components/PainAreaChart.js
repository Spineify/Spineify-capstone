import React, { useState, useEffect } from "react";
import { VictoryPie, VictoryLegend } from "victory";

export default (props) => {
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    setLoadingState(false)
  }, [props.dataSet])

  const pieChartData = [
    { x: "neck", y: 0 },
    { x: "upper-back", y: 0 },
    { x: "lower-back", y: 0 },
    { x: "shoulders", y: 0 },
    { x: "hips", y: 0 },
  ];

  const dataObj = {
    neck: 0,
    "upper-back": 0,
    "lower-back": 0,
    shoulders: 0,
    hips: 0,
  };

  let count = 0;

  const chartDataMap = props.dataSet.map((survey) => {
    if (survey.pain_area) {
      for (let i = 0; i < survey.pain_area.length; i++) {
        dataObj[survey.pain_area[i]] += 1;
        count++;
      }
    }
  });

  for (let i = 0; i < pieChartData.length; i++) {
    const entry = pieChartData[i];
    const count = dataObj[entry.x];
    entry.y = count;
  }

  const checkArray = pieChartData.filter((entry) => entry.y !== 0);


  const colors = {
    pink: ["#CB5599", "#5E6063"],
    teal: ["#3C6E71", "#284B63", "#D9D9D9", "#353535", "#A4C3B2"],
  };

  return (
    <div>
      {checkArray.length === 0 && loadingState === true ? (
        <p>Loading data</p>
      )
        : checkArray.length === 0 && loadingState === false
          ? <p id="pain-area-loading-message">You can view tracking data on your areas of discomfort after you take a daily quiz</p>
          : checkArray.length < 5
            ? <div className="pie-chart-container">
              <VictoryLegend
                title="Areas of discomfort"
                centerTitle
                orientation="horizontal"
                height="auto"
                style={
                  ({ border: { stroke: "black" } }, { title: { fontSize: 35 } })
                }
                data={[
                  { name: "neck", symbol: { fill: "#3C6E71" } },
                  {
                    name: "upper-back",
                    symbol: { fill: "#284B63" },
                  },
                  { name: "lower-back", symbol: { fill: "#D9D9D9" } },
                  { name: "shoulders", symbol: { fill: "#353535" } },
                  { name: "hips", symbol: { fill: "#A4C3B2" } },
                ]}
              />
              <VictoryPie
                data={checkArray}
                name="Areas of Discomfort"
                colorScale={colors["teal"]}
                innerRadius={150}
                padAngle={3}
                width={900}
                height={800}
                sortOrder={"ascending"}
                style={{
                  labels: { fontSize: 35, padding: 35 },
                }}
                labels={({ datum }) => `${((datum.y / count) * 100).toFixed(0)}% `}
              />
            </div>
            : (
              <div className="pie-chart-container">
                <VictoryLegend
                  title="Areas of discomfort"
                  centerTitle
                  orientation="horizontal"
                  height="auto"
                  style={
                    ({ border: { stroke: "black" } }, { title: { fontSize: 35 } })
                  }
                  data={[
                    { name: "neck", symbol: { fill: "#3C6E71" } },
                    {
                      name: "upper-back",
                      symbol: { fill: "#284B63" },
                    },
                    { name: "lower-back", symbol: { fill: "#D9D9D9" } },
                    { name: "shoulders", symbol: { fill: "#353535" } },
                    { name: "hips", symbol: { fill: "#A4C3B2" } },
                  ]}
                />
                <VictoryPie
                  data={pieChartData}
                  name="Areas of Discomfort"
                  colorScale={colors["teal"]}
                  innerRadius={150}
                  padAngle={3}
                  width={900}
                  height={800}
                  sortOrder={"ascending"}
                  style={{
                    labels: { fontSize: 35, padding: 35 },
                  }}
                  labels={({ datum }) => `${((datum.y / count) * 100).toFixed(0)}% `}
                />
              </div>
            )}
    </div>
  );
};
