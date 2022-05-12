import axios from 'axios'

const GET_RELEVANT_STRETCH = 'GET_RELEVANT_STRETCH';

const _getSingleStretch = (stretch) => ({
  type: GET_RELEVANT_STRETCH,
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
      });

      dispatch(_getSingleStretch(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function stretchReducer (state = [], action) {
  switch(action.type) {
    case GET_RELEVANT_STRETCH:
      return action.stretch;
    default:
      return state
  }
}
