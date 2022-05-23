import React, { useState, useEffect } from 'react'
import {
	VictoryLine,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryLegend,
	VictoryScatter,
	VictoryGroup,
} from 'victory'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TimePeriodFilter from './LineGraphTimeFilter'

export default (props) => {
	const [filterStatus, setFilterStatus] = useState('')
	const [loadingState, setLoadingState] = useState(true)
	const posesData = useSelector((state) => state.posesReducer)

	const sortedPoses = posesData.sort((a, b) => a.id - b.id)

	useEffect(() => {
		setLoadingState(false)
	}, [posesData])

	let poseDays = {}
	let poseDates = []
	const mappedPoses = sortedPoses.map((pose) => {
		const date = new Date(pose.createdAt)
		//transforming the data to become more useful
		//start by sorting the number of dates we're working with into an object, and the dates themselves into an array
		if (
			!poseDays[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`]
		) {
			poseDays[`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`] =
				[]
			poseDays[
				`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
			].push(pose)
			poseDates.push(
				`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
			)
		} else {
			poseDays[
				`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
			].push(pose)
		}
	})

	//map through the date array to access the pose data
	//within the date object to to calculations and then present it in the way that Victory wants
	const lineGraphData = poseDates.map((date) => {
		const daysPoses = poseDays[date]
		const goodPoses = daysPoses.filter((pose) => pose.type === 'Good Posture')
		const goodPosePercent = (goodPoses.length / daysPoses.length) * 100
		const dataObj = {
			x: daysPoses[0].createdAt,
			y: goodPosePercent,
		}
		return dataObj
	})

	const filterChangeHandler = (selectedStatus) => {
		setFilterStatus(selectedStatus)
	}

	let filteredGraphData = () => {
		switch (filterStatus) {
			case 'Today':
				let currentDay = new Date().getDate()
				return lineGraphData.filter((survey) => {
					let surveyTime = new Date(survey.x)
					let formatedSurvey = surveyTime.getDate()
					return formatedSurvey === currentDay
				})
			case 'Past Month':
				let currentMonth = new Date().getMonth()
				return lineGraphData.filter((survey) => {
					let surveyMonth = new Date(survey.x)
					let formatedMonth = surveyMonth.getMonth()
					return formatedMonth === currentMonth
				})
			case 'Past Year':
				let currentYear = new Date().getYear()
				return lineGraphData.filter((survey) => {
					let surveyYear = new Date(survey.x)
					let formatedYear = surveyYear.getYear()
					return formatedYear === currentYear
				})
			default:
				return lineGraphData
		}
	}

	const finalPostureLineArray = filteredGraphData()

	return (
		<div>
			{finalPostureLineArray.length === 0 && loadingState === true ? (
				<h3>Loading data, please wait</h3>
			) : finalPostureLineArray <= 1 && loadingState === false ? (
				<h3>Please turn on the posture data tracker to get data</h3>
			) : (
				<div>
					<VictoryChart theme={VictoryTheme.material} domainPadding={20}>
						<VictoryLegend
							title="Good Posture Trends"
							orientation="horizontal"
							centerTitle
							height="auto"
							data={[
								{
									name: '',
									symbol: { fill: '#E9EBE8' },
								},
							]}
							style={
								({ data: { fontSize: 1 } },
								{
									title: { fontSize: 25, fontFamily: 'clear_sans_thinregular' },
								})
							}
						/>
						<VictoryAxis
							tickCount={12}
							tickFormat={(x) => {
								switch (filterStatus) {
									case 'Today':
										return moment(x).format('LT')
									case 'Past Month':
										return moment(x).format('Do')
									case 'Past Year':
										return moment(x).format('MMMM')
									default:
										return moment(x).format('MMM Do')
								}
							}}
							fixLabelOverlap={true}
							style={{
								axisLabel: { fontSize: 12, padding: 30, stroke: '#353535' },
								tickLabels: {
									fontSize: 12,
									padding: 5,
									textAnchor: 'end',
									stroke: '#353535',
								},
								grid: { stroke: '#FFFFFF' },
								axis: { stroke: '#353535' },
							}}
						/>
						<VictoryAxis
							label={'Percent of Good Posture'}
							dependentAxis
							domain={[0, 100]}
							style={{
								axisLabel: { fontSize: 12, padding: 30, stroke: '#353535' },
								tickLabels: {
									fontSize: 12,
									padding: 5,
									textAnchor: 'end',
									stroke: '#353535',
								},
								grid: { stroke: '#FFFFFF' },
								axis: { stroke: '#353535' },
							}}
						/>
						<VictoryGroup>
							<VictoryScatter
								data={finalPostureLineArray}
								style={{ data: { fill: '#A4C3B2' } }}
							/>
							<VictoryLine
								data={finalPostureLineArray}
								style={{ data: { stroke: '#A4C3B2' } }}
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
	)
}
