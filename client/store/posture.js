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
			const { data: poses } = await axios.get(`/api/users/poses`, {
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

//poseData = {data: prediction}
export const addPose = (poseData) => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			//determine data type
			const { data } = poseData
			let type
			let max = 0
			for (let i = 0; i < Object.keys(data).length; i++) {
				if (data[i].probability > max) {
					max = data[i].probability
					type = data[i].className
				}
			}
			console.log('type', type)

			if (type !== 'No Posture') {
				const { data: pose } = await axios.post(
					`/api/users/pose`,
					{ ...poseData, type },
					{
						headers: {
							authorization: auth.token,
						},
					}
				)
				dispatch(_addPose(pose))
			}
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
