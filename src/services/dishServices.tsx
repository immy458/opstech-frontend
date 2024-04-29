import axios from 'axios'
import { apiRoutes } from '../constants/apiRoutes'

export const DishService = {
  getDishes: async (filter: DishFilter | undefined) => {
    let queryString
    if (filter) {
      queryString = new URLSearchParams(filter).toString()
    }
    const response = await axios.get<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.dishes}${queryString ? `?${queryString}` : ''}`
    )
    return response.data
  },
}
