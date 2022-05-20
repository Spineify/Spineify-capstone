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
			<h1>Congrats! You have leveled up!</h1>
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
