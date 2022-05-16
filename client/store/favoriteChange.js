import axios from 'axios'

const ADD_FAVORITE_STRETCH = 'ADD_FAVORITE_STRETCH';

const _addFavoriteStretch = (stretch) => ({
  type: ADD_FAVORITE_STRETCH,
  stretch
})

export const addFavoriteStretch = (stretch) => {
  return async (dispatch, getState) => {
    try {
      const auth = getState().auth
      const { data } = await axios.post(`/api/users/${auth.id}/favorites/`, stretch)
      dispatch(_addFavoriteStretch(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function favoriteChangeReducer(state = {}, action) {
  switch (action.type) {
    case ADD_FAVORITE_STRETCH:
      return action.stretch

    default:
      return state
  }
}
