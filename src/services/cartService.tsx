import axios from 'axios'
import { apiRoutes } from '../constants/apiRoutes'

export const CartService = {
  getCartItems: async () => {
    const response = await axios.get<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.cart}`,
      { withCredentials: true }
    )
    return response.data
  },
  addCartItem: async (dishId: string) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.cart}`,
      { dishId },
      { withCredentials: true }
    )
    return response.data
  },
  decrementCartQty: async (dishId: string) => {
    const response = await axios.put<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.cart}`,
      { dishId },
      { withCredentials: true }
    )
    return response.data
  },
  removeItemFromCart: async (dishId: string) => {
    const response = await axios.delete<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.cart}/${dishId}`,
      { withCredentials: true }
    )
    return response.data
  },
}
