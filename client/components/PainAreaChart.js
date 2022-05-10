import React from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory'

export default (props) => {
  console.log(props, 'pie props')

  //chart info: {
    //{x: pain area, y: count}
  //}

  const pieChartData = [
    {x: 'neck', y:0},
    {x: 'upper-back', y:0},
    {x: 'lower-back', y:0},
    {x: 'shoulders', y:0},
    {x: 'hips', y:0}
  ];

  const dataObj = {
    "neck": 0,
    "upper-back": 0,
    "lower-back": 0,
    "shoulders": 0,
    "hips": 0
  }
  const chartDataMap = props.dataSet.map(survey => {
    if(survey.pain_area){
      for(let i=0; i<survey.pain_area.length; i++)
      dataObj[survey.pain_area[i]] += 1
    }
  })

  for(let i=0; i<pieChartData.length; i++){
    const entry = pieChartData[i]
    const count = dataObj[entry.x]
    entry.y = count
  }

  console.log(pieChartData, 'ending pieChart?')

  return (
    <div>hello y'all</div>
  )
}
