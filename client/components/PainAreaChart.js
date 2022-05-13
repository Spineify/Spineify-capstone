import React from "react";
import { VictoryPie } from "victory";

export default (props) => {
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

  const checkArray = pieChartData.filter((entry) => entry.y !== 0).length;

  return (
    <div>
      {checkArray.length === 0 ? (
        <p>Loading data</p>
      ) : (
        <div className="pie-chart-container">
          <h5>Areas of discomfort</h5>
          <VictoryPie
            data={pieChartData}
            name="Areas of Discomfort"
            colorScale={"warm"}
            innerRadius={150}
            padAngle={3}
            width={900}
            height={800}
            sortOrder={"ascending"}
            style={{
              labels: { fontSize: 30, padding: 35 },
            }}
            labels={({ datum }) =>
              `${datum.x}: ${((datum.y / count) * 100).toFixed(0)}% `
            }
          />
        </div>
      )}
    </div>
  );
};
