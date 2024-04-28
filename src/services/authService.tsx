import axios, { AxiosResponse } from 'axios'
import { apiRoutes } from '../constants/apiRoutes'

export const AuthService = {
  login: async (username: string, password: string) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.login}`,
      {
        username,
        password,
      }
    )
    return response.data
  },
  requestPasswordReset: async (email: string) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.requestPasswordReset}`,
      {
        email,
      }
    )
    return response.data
  },
  resetPassword: async (newPassword: string, token: string, userId: string) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.resetPassword}`,
      {
        newPassword,
        token,
        userId,
      }
    )
    return response.data
  },
  logout: async () => {
    const response = await axios.get<AxiosResponse>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.logout}`
    )
    return response.data
  },
  signup: async (userData: User) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.signup}`,
      userData
    )
    return response.data
  },
}
