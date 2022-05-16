import axios from 'axios'

//action type
const GET_PLANT = 'GET_PLANT'

//action creators
const _getPlant = (plant) => ({
	type: GET_PLANT,
	plant,
})

//thunk creators
export const getPlant = () => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data: plant } = await axios.get(`/api/users/plant`, {
				headers: {
					authorization: auth.token,
				},
			})
			dispatch(_getPlant(plant))
		} catch (error) {
			console.log('Could not load plant', error)
		}
	}
}

//update points&levels based on reward given to tree
export const updatePlant = (item) => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data: plant } = await axios.put(
				'/api/users/plant',
				{ item },
				{
					headers: { authorization: auth.token },
				}
			)
			dispatch(_getPlant(plant))
		} catch (error) {
			console.log('Could not update plant', error)
		}
	}
}

export default function plantReducer(state = {}, action) {
	switch (action.type) {
		case GET_PLANT:
			return action.plant
		default:
			return state
	}
}
