import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const PetPlant = () => {
	const [chest, setChest] = useState('closed')
	//plant data
	const plant = useSelector((state) => state.plantReducer)
	const { inventory } = plant
	const [water, setWater] = useState(inventory.water)
	const [nutritiousWater, setNutritiousWater] = useState(
		inventory.nutritiousWater
	)
	const [fertilizer, setFertilizer] = useState(inventory.fertilizer)

	//add setInterval to dispatch(getPlant())
	//cron job nodejs to schedule and handle notification
	//add notification when received reward

	const level = String(plant.level)
	const points = String(plant.points)
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

	const toggleChest = () => {
		if (chest === 'opened') {
			setChest('closed')
		} else {
			setChest('opened')
		}
	}

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
				<img className="tree" src={`./gamification/tree_${level}.png`} />
				<div className="inventory">
					<img
						className="chest"
						onClick={() => toggleChest()}
						src={`./gamification/chest_${chest}.png`}
					/>
					{chest === 'opened' ? (
						<div className="rewards">
							<div className="item">
								<img className="img" src={'./gamification/dirt.png'} />
								<span>{`${inventory.fertilizer}`}</span>
							</div>

							<div className="item">
								<img
									className="img"
									src={'./gamification/nutritious_water.png'}
								/>
								<span>{`${inventory.nutritiousWater}`}</span>
							</div>

							<div className="item">
								<img className="img" src={'./gamification/water.png'} />
								<span>{`${inventory.water}`}</span>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	)
}

export default PetPlant
