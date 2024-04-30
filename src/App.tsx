import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login/Login'
import { appRoutes } from './constants/appRoutes'
import Dishes from './pages/Dishes/Dishes'
import PasswordReset from './pages/PasswordReset/PasswordReset'
import { useContext } from 'react'
import { authContext } from './hooks/useAuth'
import Signup from './pages/Signup/Signup'
import Profile from './pages/Profile/Profile'
import Cart from './pages/Cart/Cart'
import { USER_TYPE } from './constants'
import AddDish from './pages/Dishes/AddDish'
import Error from './components/Error'

interface IRoute {
  redirectPath: string
  children: React.ReactNode
}

function App() {
  const auth = useContext(authContext)

  const PrivateRoute = ({ redirectPath, children }: IRoute) =>
    auth.isAuthenticated ? <>{children}</> : <Navigate to={redirectPath} />

  const AdminRoute = ({ redirectPath, children }: IRoute) =>
    auth.isAuthenticated && auth.user.role === USER_TYPE.ADMIN ? (
      <>{children}</>
    ) : (
      <Navigate to={redirectPath} />
    )

  return (
    <>
      <Header />
      <Routes>
        <Route
          path={appRoutes.homePage}
          element={
            <PrivateRoute redirectPath='/login'>
              <Dishes />
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
        <Route
          path={appRoutes.cartPage}
          element={
            <PrivateRoute redirectPath='/login'>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path={appRoutes.addDishPage}
          element={
            <AdminRoute redirectPath='/error'>
              <AddDish />
            </AdminRoute>
          }
        />
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
