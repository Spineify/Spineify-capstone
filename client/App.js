import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'
import Routes from './Routes'
import Screenshot from './components/Screenshot'
import Tracker from './components/Tracker'
import { getModel } from './store/tmModel'
import SurveyModal from './components/SurveyModal'

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
			<SurveyModal />
		</div>
	)
}

export default App
