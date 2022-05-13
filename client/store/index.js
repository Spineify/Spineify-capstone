import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import surveyReducer from "./surveyData";
import surveyDataSetReducer from "./surveyDataSet";
import favoriteReducer from './favorite'

import posesReducer from "./posture";
import modelReducer from "./tmModel";
import plantReducer from "./petPlant";
import stretchReducer from './stretch'

const reducer = combineReducers({
  auth,
  surveyReducer,
  posesReducer,
  modelReducer,
  dataSet: surveyDataSetReducer,
	stretchList: stretchReducer,
  plantReducer,
  favorite: favoriteReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
