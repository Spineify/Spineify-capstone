import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlant, updatePlant } from '../store/petPlant'

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

	const inventoryTotal =
		inventory.fertilizer + inventory.nutritiousWater + inventory.water
	let prizesTotal = inventoryTotal > 0 ? true : false

	//add setInterval to dispatch(getPlant())
	//cron job nodejs to schedule and handle notification
	//notification when received reward/got points deducted
	useEffect(() => {
		const getPlantInterval = setInterval(async function () {
			if (!props.modalShow) {
				dispatch(getPlant())
			}
			const prevInventory = prevPlant.inventory
			const { inventory } = plant

			if (
				prevInventory.fertilizer < inventory.fertilizer ||
				prevInventory.nutritiousWater < inventory.nutritiousWater ||
				prevInventory.water < inventory.water
			) {
				electron.notificationApi.sendNotification(
					`Great Job you got more prizes!`
				)
			}

			if (prevPlant.points > plant.points && prevPlant.level === plant.level) {
				electron.notificationApi.sendNotification(
					`You haven't fed your tree in a while`
				)
			}

			setPrevPlant(plant)
		}, 5000)
		return () => {
			clearInterval(getPlantInterval)
		}
	}, [plant, props.modalShow])

	const onDrag = (event, item) => {
		event.preventDefault()
		setDraggedItem(item)
	}

	const onDrop = () => {
		dispatch(updatePlant(draggedItem))
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
										<span>{`${inventory.fertilizer}`}</span>
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
										<span>{`${inventory.nutritiousWater}`}</span>
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

										<span>{`${inventory.water}`}</span>
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
		)
	}
}

export default PetPlant
