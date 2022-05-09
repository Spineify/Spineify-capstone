
import React from 'react'

import Navbar from './components/Navbar'
import Routes from './Routes'
import Posenet from './components/Posenet'
import BaseCalibration from './components/BaseCalibration'

const App = () => {
	return (
		<div>
			<Navbar />
			<Routes />
			{/* <BaseCalibration /> */}
		</div>
	)
}


export default App
