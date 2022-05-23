import axios from 'axios'

const GET_ALLDATA = 'GET_ALLDATA'
const GET_USERDATA = 'GET_USERDATA'

//do not need to get all survey data (no admin feature)
// const _getAllData = (survey) => ({
// 	type: GET_ALLDATA,
// 	survey,
// })

const _getUserData = (survey) => ({
	type: GET_USERDATA,
	survey,
})

//do not need to get all survey data (no admin feature)
// export const getAllData = () => {
//   return async (dispatch, getState) => {
//     try {
//       const auth = getState().auth
//       const { data } = await axios.get("/api/surveydata", {
//         headers: {
//           authorization: auth.token
//         }
//       });
//       dispatch(_getAllData(data));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const getUserData = () => {
	return async (dispatch, getState) => {
		try {
			const auth = getState().auth
			const { data } = await axios.get(`/api/surveydata/`, {
				headers: {
					authorization: auth.token,
				},
			})
			dispatch(_getUserData(data))
		} catch (err) {
			console.log(err)
		}
	}
}

export default function surveyDataSetReducer(state = [], action) {
	switch (action.type) {
		case GET_ALLDATA:
			return action.survey
		case GET_USERDATA:
			return action.survey
		default:
			return state
	}
}
