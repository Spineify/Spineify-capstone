import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory'
import { getUserData, getAllData } from '../store/surveyDataSet'
import moment from 'moment'

export default (props) => {
  const dispatch = useDispatch()
  const [surveyData, setSurveyData] = useState([])
  const userId = useSelector((state) => state.auth.id)
  const dataSet = useSelector((state) => state.dataSet)
  console.log(dataSet, 'dataSet state test?')

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllData())
    }
    fetchData()
  }, [dispatch])
  //may need to put dispatch back into the square brackets

  const graphData = [];
  const graphDataMap = dataSet.map(survey => {
    console.log(survey.createdAt, 'survey time')
    const formatTime = Date.now()-Date.parse(survey.createdAt)

    console.log(moment(survey.createdAt).fromNow(), 'time ago')

    const dataObj = {
      discomfort_level: Number(survey.discomfort_level),
      time_taken: formatTime
    }
    graphData.push(dataObj)
  })

  console.log('graphData: ', graphData)
  //I think this is what we need for the graphs! moment(time_taken).fromNow() will list how long ago it's been since the survey's been taken, but this version will be easy for the computer to parse! (it's the time since it's been taken in milliseconds)

  //we'll need to use the moment library to display times dynamically
  //moment(time_taken).fromNow();


// test data, will be deleted //
  const data2012 = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];

  const data2013 = [
    { quarter: 1, earnings: 15000 },
    { quarter: 2, earnings: 12500 },
    { quarter: 3, earnings: 19500 },
    { quarter: 4, earnings: 13000 }
  ];

  const data2014 = [
    { quarter: 1, earnings: 11500 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 20000 },
    { quarter: 4, earnings: 15500 }
  ];

  const data2015 = [
    { quarter: 1, earnings: 18000 },
    { quarter: 2, earnings: 13250 },
    { quarter: 3, earnings: 15000 },
    { quarter: 4, earnings: 12000 }
  ];

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={20}
    >
      <VictoryAxis
        // tickValues specifies both the number of ticks and where
        // they are placed on the axis
        tickValues={[1, 2, 3, 4]}
        tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
      />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={(x) => (`$${x / 1000}k`)}
      />
      <VictoryStack
        colorScale={"warm"}
      >
        <VictoryBar
          data={data2012}
          x="quarter"
          y="earnings"
        />
        <VictoryBar
          data={data2013}
          x="quarter"
          y="earnings"
        />
        <VictoryBar
          data={data2014}
          x="quarter"
          y="earnings"
        />
        <VictoryBar
          data={data2015}
          x="quarter"
          y="earnings"
        />
      </VictoryStack>
    </VictoryChart>
  )
}
