import axios from "axios";

const GET_ALLDATA = "GET_ALLDATA";
const ADD_DATA = "ADD_DATA";

const _getAllData = (surveyData) => ({
  type: GET_ALLDATA,
  surveyData,
});
const _addData = (surveyData) => ({
  type: ADD_DATA,
  surveyData,
});

export const getAllData = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/surveydata");
      dispatch(_getAllData(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export const addData = (surveyData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/surveydata", surveyData);
      dispatch(_addData(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export default function surveyReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALLDATA:
      return action.surveyData;
    case ADD_DATA:
      return action.surveyData;
    default:
      return state;
  }
}
