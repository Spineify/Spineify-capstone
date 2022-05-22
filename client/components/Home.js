import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
//components
import PetPlant from './PetPlant'
import SurveyModal from './SurveyModal'
import StretchList from './StretchList'
import Clock from './Clock'
import UserHomeDash from './UserHomeDash'
import { Alert } from 'react-bootstrap'
//thunkcreators
import { getPoses } from '../store/posture'
import { getPlant } from '../store/petPlant'
import { suggestStretch } from '../store/stretch'
import { getLatestSurveyData } from '../store/surveyData'

/**
 * COMPONENT
 */
export const Home = (props) => {
	const { firstName } = props
	const dispatch = useDispatch()
	const [show, setShow] = useState(true)
	const userId = useSelector((state) => state.auth.id)
	const plant = useSelector((state) => state.plantReducer)
	const surveyData = useSelector((state) => state.surveyReducer)
	const stretchList = useSelector((state) => state.stretchList)
	//modalShow is used in PetPlant componenet so that home component does not rerender when user is taking survey. see line 27 of petplant component
	const [modalShow, setModalShow] = useState(false)

	//get all poses and plant
	useEffect(() => {
		dispatch(getPoses())
		dispatch(getPlant())
		dispatch(getLatestSurveyData())
	}, [])

	useEffect(() => {
		if (Object.keys(surveyData).length !== 0) {
			dispatch(suggestStretch(surveyData.pain_area))
		}
	}, [surveyData])

	useEffect(() => {}, [modalShow])

	return (
		<div id="home">
			<div className="reminder">
				{userId && (
					<div>
						{show && (
							<Alert color="primary" variant="success" closeLabel="Close alert">
								Don't forget to take your daily survey! 🌱
								<button
									className="reminder-button"
									type="button"
									onClick={() => setShow(false)}
								>
									X
								</button>
							</Alert>
						)}
					</div>
				)}
			</div>
			<div className="home-info">
				<div className="welcome-info">
					<div className="user-dash-container">
						<h3 className="welcome-name">Hello, {firstName}.</h3>
						<Clock />
						<UserHomeDash />
						<SurveyModal setModalShow={setModalShow} modalShow={modalShow} />
						{stretchList.length > 0 && <StretchList />}
					</div>
				</div>
				<div className="homeContent">
					{Object.keys(plant).length && <PetPlant modalShow={modalShow} />}
				</div>
				<br />
			</div>
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		firstName: state.auth.firstName,
	}
}

export default connect(mapState)(Home)
