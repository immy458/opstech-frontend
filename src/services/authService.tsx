import axios, { AxiosResponse } from 'axios'
import { apiRoutes } from '../constants/apiRoutes'

export const AuthService = {
  login: async (username: string, password: string) => {
    const response = await axios.post<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.login}`,
      {
        username,
        password,
      },
      { withCredentials: true }
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
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.logout}`,
      { withCredentials: true }
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
  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await axios.patch<APIResult>(
      `${import.meta.env.VITE_BACKEND_SERVICE_URL}${apiRoutes.changePassword}`,
      { currentPassword, newPassword },
      {
        withCredentials: true,
      }
    )
    return response.data
  },
}
