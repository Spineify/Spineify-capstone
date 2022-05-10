import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { VictoryLine, VictoryScatter, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory'
import { getUserData, getAllData } from '../store/surveyDataSet'
import moment from 'moment'

export default (props) => {
  const dispatch = useDispatch()
  const [surveyData, setSurveyData] = useState([])
  const userId = useSelector((state) => state.auth.id)
  const dataSet = useSelector((state) => state.dataSet)

  const sortedSet = dataSet.sort((a,b) => {
    return a.id - b.id
  })

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllData())
    }
    fetchData()
  }, [dispatch])
  //may need to put dispatch back into the square brackets

  const graphData = [];
  const graphDataMap = sortedSet.map(survey => {
    //console.log(survey.createdAt, 'survey time')

    const formatTime = Date.now() - Date.parse(survey.createdAt)
    const negativeTime = Date.parse(survey.createdAt) - Date.now()
    //console.log(negativeTime, 'time since survey taken')

    //console.log(moment(survey.createdAt).fromNow(), 'time ago')

    const dataObj = {
      x: survey.createdAt,
      y: Number(survey.discomfort_level),
    }
    graphData.push(dataObj)
  })

  console.log('graphData: ', graphData)
  //I think this is what we need for the graphs! moment(time_taken).fromNow() will list how long ago it's been since the survey's been taken, but this version will be easy for the computer to parse! (it's the time since it's been taken in milliseconds)

  //we'll need to use the moment library to display times dynamically
  //moment(time_taken).fromNow();


  return (
    <div>
      {graphData.length === 0 ? <h1>Loading data, please wait</h1> :
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
          label="Time Taken"
          padding={50}
          tickFormat={(x)=>moment(x).format("MMM Do")}
          fixLabelOverlap={true}
          // range={} this will be used when we filter time ranges
          style={{
            axisLabel: {fontSize:12, padding: 30},
            tickLabels: {fontSize: 8, padding: 5}
          }}
          />
          <VictoryAxis
          label={"Discomfort Level"}
            dependentAxis
            domain={[0,10]}
            padding={50}
            style={{
              axisLabel: {fontSize:12, padding: 30},
              tickLabels: {fontSize: 8, padding: 5}
            }}
          />
          <VictoryStack
            colorScale={"warm"}
          >
            {console.log(graphData.length, graphData, 'data within return')}
            <VictoryLine
              data={graphData}
            />
          </VictoryStack>
        </VictoryChart>
      }
    </div>

  )
}
