//action types

//I noticed the TMmodel when imported is different compared to the script
const GET_MODEL = 'GET_MODEL'

//action creators
const _getModel = (model) => ({
	type: GET_MODEL,
	model,
})

//thunk creators
export const getModel = () => {
	return async (dispatch) => {
		try {
			const URL = 'https://teachablemachine.withgoogle.com/models/TzVVyOfnc/'
			const modelURL = URL + 'model.json'
			const metadataURL = URL + 'metadata.json'
			const loadedModel = await tmPose.load(modelURL, metadataURL)
			console.log(loadedModel)
			dispatch(_getModel(loadedModel))
		} catch (error) {
			console.log('could not load tm model', error)
		}
	}
}

export default function modelReducer(state = {}, action) {
	switch (action.type) {
		case GET_MODEL:
			return action.model
		default:
			return state
	}
}
