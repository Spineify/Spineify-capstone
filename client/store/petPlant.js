import axios from "axios";

const GET_PLANT = "GET_PLANT";

const _getPlant = (plant) => ({
  type: GET_PLANT,
  plant,
});

export const getPlant = () => {
  return async (dispatch, getState) => {
    try {
      const auth = getState().auth;
      const { data: plant } = await axios.get(`/api/users/plant`, {
        headers: {
          authorization: auth.token,
        },
      });
      dispatch(_getPlant(plant));
    } catch (error) {
      console.log("Could not load plant", error);
    }
  };
};

export default function plantReducer(state = {}, action) {
  switch (action.type) {
    case GET_PLANT:
      return action.plant;
    default:
      return state;
  }
}
