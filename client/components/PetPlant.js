import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlant, updatePlant } from '../store/petPlant'

import isElectron from 'is-electron'
import ReactRain from 'react-rain-animation'
import 'react-rain-animation/lib/style.css'

import LevelUp from './Confetti'

const PetPlant = (props) => {
	const [chest, setChest] = useState('closed')

	useEffect(() => {
		dispatch(getPlant())
	}, [])
	//plant data
	const plant = useSelector((state) => state.plantReducer)
	const { inventory } = plant
	const [draggedItem, setDraggedItem] = useState('')
	const [prevPlant, setPrevPlant] = useState(plant)
	const dispatch = useDispatch()
	const [levelUp, setLevelUp] = useState(false)

	const [dropped, setDropped] = useState(false)

	const inventoryTotal =
		inventory.fertilizer + inventory.nutritiousWater + inventory.water
	let prizesTotal = inventoryTotal > 0 ? true : false

	//add setInterval to dispatch(getPlant())
	//cron job nodejs to schedule and handle notification
	//notification when received reward/got points deducted
	useEffect(() => {
		if (prevPlant.level < plant.level) {
			setLevelUp(true)
		}

		const getPlantInterval = setInterval(async function () {
			if (!props.modalShow) {
				dispatch(getPlant())
			}
			const prevInventory = prevPlant.inventory
			const { inventory } = plant

			if (isElectron()) {
				if (
					prevInventory.fertilizer < inventory.fertilizer ||
					prevInventory.nutritiousWater < inventory.nutritiousWater ||
					prevInventory.water < inventory.water
				) {
					electron.notificationApi.sendNotification(
						`Great Job you got more prizes!`
					)
				}

				if (
					prevPlant.points > plant.points &&
					prevPlant.level === plant.level
				) {
					electron.notificationApi.sendNotification(
						`You haven't fed your tree in a while`
					)
				}
			}

			setPrevPlant(plant)
		}, 5000)
		return () => {
			clearInterval(getPlantInterval)
		}
	}, [plant, props.modalShow])

	useEffect(() => {
		if (levelUp === true) {
			setTimeout(() => setLevelUp(false), 5000)
		}
	}, [levelUp])

	const onDrag = (event, item) => {
		event.preventDefault()
		setDraggedItem(item)
	}

	const onDrop = () => {
		dispatch(updatePlant(draggedItem))

		if (draggedItem === 'nutritiousWater' || draggedItem === 'water') {
			setDropped(true)
			setTimeout(() => setDropped(false), 4000)
			// return <ReactRain numDrops="300" />;
		}

		setDraggedItem('')
		//add animation when tree is fed
	}

	const onDragOver = (event) => {
		event.preventDefault()
	}

	const level = String(plant.level)
	const points = String(plant.points)

	//update background based on time of day
	const date = new Date()
	const hour = date.getHours()
	let timeOfDay
	if (hour > 6 && hour <= 10) {
		timeOfDay = 'morning'
	} else if (hour > 10 && hour <= 17) {
		timeOfDay = 'afternoon'
	} else {
		timeOfDay = 'evening'
	}

	//toggle chest animation
	const toggleChest = () => {
		if (chest === 'opened') {
			setChest('closed')
		} else {
			setChest('opened')
		}
	}

	if (Object.keys(plant).length) {
		return (
			<div className={`gameFrame ${timeOfDay}`}>
				{levelUp && <LevelUp />}
				{dropped ? <ReactRain numDrops="500" /> : null}

				<div className="content">
					<div className="level">
						<h1>{`Level ${level}`}</h1>
						<h2>{`${12 - points} point${
							12 - points !== 1 ? 's' : ''
						} to go!`}</h2>
					</div>
					<div className="progress">
						<div
							className="progress-bar progress-bar-striped progress-bar-animated"
							role="progressbar"
							aria-valuenow={`${points}`}
							aria-valuemin="0"
							aria-valuemax="12"
							style={{ width: `${Math.floor((points / 12) * 100)}%` }}
						></div>
					</div>
					<div className="game">
						<img
							className="tree"
							src={`./gamification/tree_${level}.png`}
							onDrop={() => onDrop()}
							onDragOver={(event) => onDragOver(event)}
						/>
						<div className="inventory">
							<img
								className="chest"
								onClick={() => toggleChest()}
								src={`./gamification/chest_${chest}_new.png`}
							/>
							{chest === 'opened' && prizesTotal ? (
								//if inventory is empty, show nothing or send message
								<div className="rewards">
									{/* if inventory of item is 0, dont render */}
									{inventory.fertilizer > 0 && (
										<div className="item">
											<img
												value="fertilizer"
												draggable="true"
												onDrag={(event) => onDrag(event, 'fertilizer')}
												className="img"
												src={'./gamification/dirt.png'}
											/>

											<span>{`x${inventory.fertilizer}`}</span>
										</div>
									)}
									{/* if inventory of item is 0, dont render */}
									{inventory.nutritiousWater > 0 && (
										<div className="item">
											<img
												value="nutritiousWater"
												draggable="true"
												onDrag={(event) => onDrag(event, 'nutritiousWater')}
												className="img"
												src={'./gamification/nutritious_water.png'}
											/>

											<span>{`x${inventory.nutritiousWater}`}</span>
										</div>
									)}

									{/* if inventory of item is 0, dont render */}
									{inventory.water > 0 && (
										<div className="item">
											<img
												value="water"
												draggable="true"
												onDrag={(event) => onDrag(event, 'water')}
												className="img"
												src={'./gamification/water.png'}
											/>

											<span>{`x${inventory.water}`}</span>
										</div>
									)}
								</div>
							) : null}
							{chest === 'opened' && !prizesTotal ? (
								//if inventory is empty, show nothing or send message
								<p className="bubble">
									No prizes in your chest! Maintain Good posture to earn more~
								</p>
							) : null}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PetPlant