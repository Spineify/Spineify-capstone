import axios from "axios";

const GET_ALLDATA = "GET_ALLDATA";
const GET_USERDATA = 'GET_USERDATA'

const _getAllData = (survey) => ({
  type: GET_ALLDATA,
  survey,
});

const _getUserData = (survey) => ({
  type: GET_USERDATA,
  survey
})

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

export const getUserData = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/surveydata/${userId}`)
      dispatch(_getUserData(data))
    } catch(err) {
      next(err)
    }
  }
}

export default function surveyDataSetReducer (state = [], action) {
  switch (action.type) {
    case GET_ALLDATA:
      return action.survey;
    case GET_USERDATA:
      return action.survey;
    default:
      return state
  }
}
