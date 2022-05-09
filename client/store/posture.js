import axios from 'axios'

//action types
const GET_POSES = 'GET_POSES'
const ADD_POSE = 'ADD_POSE'

//action creators
const _getPoses = (poses) => ({
	type: GET_POSES,
	poses,
})

const _addPose = (pose) => ({
	type: ADD_POSE,
	pose,
})

//thunk creators
export const getPoses = (id) => {
	return async (dispatch) => {
		try {
			const { data: poses } = await axios.get(`/api/users/${id}/poses`)
			dispatch(_getPoses(poses))
		} catch (error) {
			console.log('Could not load poses', error)
		}
	}
}

export const addPose = (poseData) => {
	return async (dispatch) => {
		try {
			const { data: pose } = await axios.post(
				`/api/users/${poseData.id}/pose`,
				poseData
			)
			dispatch(_addPose(pose))
		} catch (error) {
			console.log('Could not add pose', error)
		}
	}
}

export default function posesReducer(state = [], action) {
	switch (action.type) {
		case GET_POSES:
			return action.poses
		case ADD_POSE:
			return [...state, action.pose]
		default:
			return state
	}
}
