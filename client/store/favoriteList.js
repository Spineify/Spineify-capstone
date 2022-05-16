import axios from 'axios'

const GET_FAVORITE_STRETCH = 'GET_FAVORITE_STRETCH';
const DELETE_FAVORITE_STRETCH = 'DELETE_FAVORITE_STRETCH';

const _getFavoriteStretch = (stretch) => ({
  type: GET_FAVORITE_STRETCH,
  stretch
})

const _deleteFavoriteStretch = (stretch) => ({
  type: DELETE_FAVORITE_STRETCH,
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

export const deleteFavoriteStretch = (stretch) => {
  return async (dispatch, getState) => {
    try {
      const auth = getState().auth
      const { data } = await axios.delete(`/api/users/${auth.id}/favorites/${stretch.id}`)
      dispatch(_deleteFavoriteStretch(data))
    } catch (err) {
      console.log(err)
    }
  }
}


export default function favoriteReducer(state = [], action) {
  switch (action.type) {
    case GET_FAVORITE_STRETCH:
      return action.stretch
    case DELETE_FAVORITE_STRETCH:
      return state.filter((stretch => stretch.id !== action.stretch.id))
    default:
      return state
  }
}
