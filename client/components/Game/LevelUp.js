import React from 'react'
import Confetti from 'react-confetti'

const sgColors = [
	'#9ce8c2',
	'#60d399',
	'#b9e2fe',
	'#4fb3f6',
	'#bdc7fb',
	'#6d83f3',
	'#ff7968',
	'#ffe8e5',
	'#fedd8e',
	'#fbbe2e',
]

function LevelUp() {
	return (
		<div className="congrats">
			<div className="message">
				<h1>Congrats!</h1>
				<h2>You leveled up!</h2>
			</div>
			<Confetti
				className="confetti"
				colors={sgColors}
				numberOfPieces={300}
				gravity={0.17}
			/>
		</div>
	)
}

export default LevelUp
