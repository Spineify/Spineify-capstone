import axios from "axios";

const ADD_DATA = "ADD_DATA";

const _addData = (surveyData) => ({
  type: ADD_DATA,
  surveyData,
});

export const addData = (surveyData) => {
  console.log("SUVERDATA", surveyData);
  return async (dispatch) => {
    console.log("after return");
    try {
      console.log("inside try block of store");
      const { data } = await axios.post("/api/surveydata", surveyData);
      console.log("DATA store", data);
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
