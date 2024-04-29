import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login/Login'
import { appRoutes } from './constants/appRoutes'
import Home from './pages/Home/Home'
import PasswordReset from './pages/PasswordReset/PasswordReset'
import { useContext } from 'react'
import { authContext } from './hooks/useAuth'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'

interface IRoute {
  redirectPath: string
  children: React.ReactNode
}

function App() {
  const auth = useContext(authContext)

  const PrivateRoute = ({ redirectPath, children }: IRoute) =>
    auth.isAuthenticated ? <>{children}</> : <Navigate to={redirectPath} />

  return (
    <>
      <Header />
      <Routes>
        <Route
          path={appRoutes.homePage}
          element={
            <PrivateRoute redirectPath='/login'>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={appRoutes.loginPage}
          element={!auth.isAuthenticated ? <Login /> : <Navigate to='/' />}
        />
        <Route
          path={appRoutes.signupPage}
          element={!auth.isAuthenticated ? <Signup /> : <Navigate to='/' />}
        />
        <Route path={appRoutes.passwordResetPage} element={<PasswordReset />} />
        <Route
          path={appRoutes.profilePage}
          element={
            <PrivateRoute redirectPath='/login'>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
