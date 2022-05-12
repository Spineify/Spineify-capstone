import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getPoses } from '../store/posture'
import Tracker from './Tracker'
/**
 * COMPONENT
 */
export const Home = (props) => {
	const { username } = props
	const dispatch = useDispatch()

	//get all poses
	useEffect(() => {
		dispatch(getPoses())
	}, [])

	return (
		<div>
			<h3>Welcome, {username}</h3>
			<Tracker />
		</div>
	)
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		username: state.auth.username,
	}
}

export default connect(mapState)(Home)
