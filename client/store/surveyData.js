import axios from "axios";

const ADD_DATA = "ADD_DATA";


const _addData = (surveyData) => ({
  type: ADD_DATA,
  surveyData,
});



export const addData = (surveyData) => {
  return async (dispatch) => {
    const jsonData = JSON.parse(surveyData);
    try {
      const { data } = await axios.post("/api/surveydata", jsonData);
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
