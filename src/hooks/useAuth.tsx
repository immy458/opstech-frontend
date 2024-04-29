import { createContext, useEffect, useState } from 'react'
import { initialUserState } from '../constants/initialStates'
import { AuthService } from '../services/authService'
import { useLocation, useNavigate } from 'react-router-dom'

interface AuthContext {
  user: User
  isAuthenticated?: boolean
  signIn: (email: string, password: string) => Promise<APIResult>
  signOut: () => Promise<void>
}

interface ProvideAuthProps {
  children: React.ReactNode
}

export const authContext = createContext({} as AuthContext)

export const ProvideAuth: React.FC<ProvideAuthProps> = ({ children }) => {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

const useProvideAuth = (): AuthContext => {
  const [user, setUser] = useState<User>(initialUserState)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const signIn = async (username: string, password: string) => {
    const response = await AuthService.login(username, password)
    const userDetails = response.data as User
    setUser(userDetails)
    setIsAuthenticated(true)
    sessionStorage.setItem('user', JSON.stringify(userDetails))
    return response
  }

  const signOut = async (): Promise<void> => {
    await AuthService.logout()
    setUser(initialUserState)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser) as User)
      setIsAuthenticated(true)
      navigate(`${location.pathname}${location.search}`)
    }
  }, [])

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
  }
}
