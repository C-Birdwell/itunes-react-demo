import { combineReducers } from 'redux'
import responseReducer from '../reducers/response'
import savedItems from '../reducers/savedItems'

export default combineReducers({
  response: responseReducer,
  favorite: savedItems,
})
