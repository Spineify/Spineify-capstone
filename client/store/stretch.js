import axios from 'axios'

const GET_SINGLE_STRETCH = 'GET_SINGLE_STRETCH';

const _getSingleStretch = (stretch) => ({
  type: GET_SINGLE_STRETCH,
  stretch
})

export const suggestStretch = (pain_area) => {
  return async (dispatch, getState) => {
    try {
      const auth = getState().auth;
      const { data } = await axios.get(`/api/stretches/${pain_area[0]}`, {
        headers: {
          authorization: auth.token
        }
      }
      );
      console.log(data, 'data in the thunk?')
      dispatch(_getSingleStretch(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function stretchReducer (state = [], action) {
  switch(action.type) {
    case GET_SINGLE_STRETCH:
      console.log("ACTION STRETCH", action.stretch)
      return action.stretch;
    default:
      return state
  }
}
