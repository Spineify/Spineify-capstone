import axios from 'axios'

const ADD_DATA = 'ADD_DATA'
const GET_DATA = 'GET_DATA'

const _addData = (surveyData) => ({
	type: ADD_DATA,
	surveyData,
})

const _getData = (surveyData) => ({
	type: GET_DATA,
	surveyData,
})

export const getData = () => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data: surveyData } = await axios.get('api/surveydata/today', {
				headers: { authorization: auth.token },
			})
			const latestData = surveyData[surveyData.length - 1]
			dispatch(_getData(latestData))
		} catch (err) {
			console.log(err.response.data)
		}
	}
}

export const addData = (surveyData) => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data } = await axios.post('/api/surveydata', surveyData, {
				headers: {
					authorization: auth.token,
				},
			})
			dispatch(_addData(data))
		} catch (err) {
			console.log(err.response.data)
		}
	}
}

export default function surveyReducer(state = {}, action) {
	switch (action.type) {
		case ADD_DATA:
			return action.surveyData
		case GET_DATA:
			return action.surveyData
		default:
			return state
	}
}
