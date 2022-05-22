import React, { useState, useEffect } from 'react'
import { VictoryPie, VictoryLegend } from 'victory'

export default (props) => {
	const [loadingState, setLoadingState] = useState(true)

	useEffect(() => {
		setLoadingState(false)
	}, [props.dataSet])

	const pieChartData = [
		{ x: 'neck', y: 0 },
		{ x: 'upper-back', y: 0 },
		{ x: 'lower-back', y: 0 },
		{ x: 'shoulders', y: 0 },
		{ x: 'hips', y: 0 },
	]

	const dataObj = {
		neck: 0,
		'upper-back': 0,
		'lower-back': 0,
		shoulders: 0,
		hips: 0,
	}

	let count = 0

	const chartDataMap = props.dataSet.map((survey) => {
		if (survey.pain_area) {
			for (let i = 0; i < survey.pain_area.length; i++) {
				dataObj[survey.pain_area[i]] += 1
				count++
			}
		}
	})

	for (let i = 0; i < pieChartData.length; i++) {
		const entry = pieChartData[i]
		const count = dataObj[entry.x]
		entry.y = count
	}

	const checkArray = pieChartData.filter((entry) => entry.y !== 0)

	const colors = {
		teal: ['#3C6E71', '#284B63', '#FFFFFF', '#353535', '#A4C3B2'],
	}

	let index = 0
	const colorsArray = checkArray.map((category) => {
		const colorObj = {
			name: category.x,
			symbol: {
				fill: colors.teal[index],
			},
		}
		index++
		return colorObj
	})

	let colorScaleArray = []
	for (let i = 0; i < checkArray.length; i++) {
		colorScaleArray.push(colors.teal[i])
	}

	return (
		<div>
			{checkArray.length === 0 && loadingState === true ? (
				<p>Loading data</p>
			) : checkArray.length === 0 && loadingState === false ? (
				<p id="pain-area-loading-message">
					You can view tracking data on your areas of discomfort after you take
					a daily quiz
				</p>
			) : (
				<div className="pie-chart-container">
					<h4>Areas of Discomfort</h4>
					<VictoryLegend
						//title="Areas of discomfort"
						centerTitle
						height={75}
						style={
							({ border: { stroke: 'black' } }, { title: { fontSize: 25 } })
						}
						data={colorsArray}
						itemsPerRow={3}
					/>
					<VictoryPie
						data={checkArray}
						name="Areas of Discomfort"
						colorScale={colorScaleArray}
						innerRadius={150}
						padAngle={3}
						width={900}
						height={800}
						sortOrder={'ascending'}
						style={{
							labels: { fontSize: 35, padding: 35 },
						}}
						labels={({ datum }) => `${((datum.y / count) * 100).toFixed(0)}% `}
					/>
				</div>
			)}
		</div>
	)
}
