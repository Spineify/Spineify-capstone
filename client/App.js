import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Routes from './Routes'
import Screenshot from './components/Screenshot'
import Tracker from './components/Tracker'
import { getModel } from './store/tmModel'

const App = () => {
	const dispatch = useDispatch()

	//load teachable machine model
	useEffect(() => {
		dispatch(getModel())
	}, [])

	return (
		<div>
			<Navbar />
			<Routes />
			<Tracker />
		</div>
	)
}

export default App
