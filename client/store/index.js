import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import auth from './auth'
import surveyReducer from './surveyData'
import surveyDataSetReducer from "./surveyDataSet";
import posesReducer from './posture'
import modelReducer from './tmModel'

const reducer = combineReducers({
	auth,
	surveyReducer,
	posesReducer,
	modelReducer,
  dataSet: surveyDataSetReducer,
})

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
