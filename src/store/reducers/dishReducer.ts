import { ACTION_TYPES } from '../../constants/actionTypes'
import { initialDishFilterState } from '../../constants/initialStates'

const initialState: DishFilter = initialDishFilterState

export const dishFilterReducer = (
  state: DishFilter = initialState,
  action: ReduxAction<DishFilter>
): DishFilter => {
  switch (action.type) {
    case ACTION_TYPES.SET_SELECTED_DISH_FILTERS as string:
      return action.payload ? { ...action.payload } : state
    default:
      return state
  }
}
