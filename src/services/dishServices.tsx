import axios from 'axios'
import { apiRoutes } from '../constants/apiRoutes'

export const DishService = {
  getDishes: async (filter: DishFilter | undefined) => {
    let queryString
    if (filter) {
      const filterAsRecord: Record<string, string> = {}

      if (filter.type) {
        filterAsRecord.type = filter.type
      }
      if (filter.cuisine) {
        filterAsRecord.cuisine = filter.cuisine
      }
      if (filter.category) {
        filterAsRecord.category = filter.category
      }

      queryString = new URLSearchParams(filterAsRecord).toString()
    }
    const response = await axios.get<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.dishes}${queryString ? `?${queryString}` : ''}`
    )
    return response.data
  },
  addDish: async (dishData: Dish) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.dishes}`,
      dishData,
      { withCredentials: true }
    )
    return response.data
  },
}
