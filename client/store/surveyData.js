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
    const jsonData = JSON.parse(surveyData);

    // if (jsonData.pain_area) {
    //   const normalStringValue = jsonData.pain_area[0].split(",");
    //   jsonData.pain_area = normalStringValue;
    // }
    // console.log("JSON", jsonData);
    try {
      const { data } = await axios.post("/api/surveydata", jsonData);
      // console.log("DATA", data);
      dispatch(_addData(data));
    } catch (err) {
      console.log(err.response.data);
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
