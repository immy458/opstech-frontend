import { ACTION_TYPES } from '../../constants/actionTypes'

export const setSelectedDishFilter = (filters: DishFilter) => {
  return { type: ACTION_TYPES.SET_SELECTED_DISH_FILTERS, payload: filters }
}
