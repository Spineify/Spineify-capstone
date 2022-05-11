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
export const getPoses = () => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data: poses } = await axios.get(`/api/users/${auth.id}/poses`, {
				headers: {
					authorization: auth.token,
				},
			})
			dispatch(_getPoses(poses))
		} catch (error) {
			console.log('Could not load poses', error)
		}
	}
}

export const addPose = (poseData) => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data: pose } = await axios.post(
				`/api/users/${auth.id}/pose`,
				poseData,
				{
					headers: {
						authorization: auth.token,
					},
				}
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
