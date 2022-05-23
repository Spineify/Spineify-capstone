import React from 'react'
import { Popover, OverlayTrigger, Button } from 'react-bootstrap'

const GameInstructions = (props) => {
	return (
		<>
			{['left'].map((placement) => (
				<OverlayTrigger
					trigger="click"
					key={placement}
					placement={placement}
					overlay={
						<Popover
							id={`popover-positioned-${placement}`}
							className="intro-popover"
							style={{ maxWidth: '550px' }}
						>
							<Popover.Header as="h3">{`Game Instructions`}</Popover.Header>
							<Popover.Body>
								Win prizes for your plant by maintaining good posture throughout
								the day 💪.
								<br />
								1. There are 15 levels total and you need 12 points to level up.
								<br />
								2. Based on your daily performance, you will receive a prize at
								the end of the day at 5pm. The criteria is as follows:
								<br />
								- fertilizer: 90% of your daily postures are good
								<br />
								- nutritious water: 75% of your daily postures are good
								<br />
								- water: 50% of your daily postures are good
								<br />
								3. Click on the chest to see the prizes you have accumulated so
								far. The point system is as follows:
								<br />
								- fertilizer: 3 points
								<br />
								- nutritious water (pink watering can): 2 points
								<br />
								- regular water (blue watering can): 1 point
								<br />
								4. If you don't feed your plant for two days, you will lose 2
								points 😔.
								<br />
								<br />
								You got this!
							</Popover.Body>
						</Popover>
					}
				>
					<button
						className={`game-instructions-button-${props.image}`}
						variant="secondary"
					>
						<img
							src={`/gamification/${props.image}.png`}
							style={{ height: '60px' }}
						/>
					</button>
				</OverlayTrigger>
			))}
		</>
	)
}

export default GameInstructions
