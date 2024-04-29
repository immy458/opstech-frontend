import { combineReducers } from 'redux'
import { dishFilterReducer } from './dishReducer'

export const rootReducer = combineReducers({
  dishFilters: dishFilterReducer,
})
