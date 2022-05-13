import axios from 'axios'

const GET_FAVORITE_STRETCH = 'GET_FAVORITE_STRETCH';

const _getFavoriteStretch = (stretch) => ({
  type: GET_FAVORITE_STRETCH,
  stretch
})

export const getFavoriteStretch = () => {
  return async (dispatch, getState) => {
    try {
      const auth = getState().auth;
      const { data } = await axios.get(`/api/users/${auth.id}/favorites`)
      dispatch(_getFavoriteStretch(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function favoriteReducer (state = [], action) {
  switch(action.type) {
    case GET_FAVORITE_STRETCH:
      return action.stretch
    default:
      return state
  }
}
