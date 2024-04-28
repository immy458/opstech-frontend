import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login/Login'
import { appRoutes } from './constants/appRoutes'
import Home from './pages/Home/Home'
import PasswordReset from './pages/PasswordReset/PasswordReset'
import { useContext } from 'react'
import { authContext } from './hooks/useAuth'

function App() {
  const auth = useContext(authContext)
  return (
    <>
      <Header />
      <Routes>
        <Route
          path={appRoutes.homePage}
          element={auth.isAuthenticated ? <Home /> : <Navigate to='/login' />}
        />
        <Route
          path={appRoutes.loginPage}
          element={!auth.isAuthenticated ? <Login /> : <Navigate to='/' />}
        />
        <Route path={appRoutes.passwordResetPage} element={<PasswordReset />} />
      </Routes>
    </>
  )
}

export default App
