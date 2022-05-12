import axios from "axios";

const ADD_DATA = "ADD_DATA";

const _addData = (surveyData) => ({
  type: ADD_DATA,
  surveyData,
});

export const addData = (surveyData) => {
  return async (dispatch, getState) => {
    try {
      const auth = getState().auth;
      const { data } = await axios.post("/api/surveydata", surveyData, {
        headers: {
          authorization: auth.token,
        },
      });
      console.log("in the addData thunk");
      dispatch(_addData(data));
    } catch (err) {
      console.log(err.response.data);
    }
  };
};

export default function surveyReducer(state = {}, action) {
  switch (action.type) {
    case ADD_DATA:
      return action.surveyData;
    default:
      return state;
  }
}
