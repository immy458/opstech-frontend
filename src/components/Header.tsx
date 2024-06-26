import React, { useContext, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { appRoutes } from '../constants/appRoutes'
import { authContext } from '../hooks/useAuth'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import { USER_TYPE } from '../constants'

interface NavItem {
  text: string
  link: string
}

const Header: React.FC = () => {
  const [navOpenView, setNavOpenView] = useState(false)
  const auth = useContext(authContext)
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification()

  const handleNav = () => {
    setNavOpenView(!navOpenView)
  }

  const navItems: NavItem[] = [{ text: 'Home', link: '/' }]
  auth.isAuthenticated &&
    navItems.push({ text: 'Profile', link: '/profile' }, { text: 'Cart', link: '/cart' })
  auth.isAuthenticated &&
    auth.user.role === USER_TYPE.ADMIN &&
    navItems.push({ text: 'Add Dish', link: '/add-dish' })

  const logout = async () => {
    try {
      await auth.signOut()
      api.success({
        message: 'Log Out',
        description: 'Logged Out Successfully.',
        duration: 30,
      })
      clearUserDetailsFromSessionStorage()
      navigate(appRoutes.loginPage)
    } catch (error) {
      const axiosError = error as AxiosError
      api.error({
        message: 'Log Out',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    }
  }

  const clearUserDetailsFromSessionStorage = () => {
    if (sessionStorage.getItem('user')) {
      sessionStorage.removeItem('user')
    }
  }

  return (
    <div className='bg-primaryDark flex justify-between items-center h-24  mx-auto px-4 text-primaryLight'>
      {contextHolder}
      <h1 className='text-3xl font-bold text-primaryMedium' onClick={() => navigate('/')}>
        OPSTECH.
      </h1>

      {/* Desktop Navigation Items */}
      <ul className='hidden md:flex'>
        {navItems.map((navItem, index) => (
          <li key={index}>
            <Link
              to={navItem.link}
              className='p-4 hover:bg-primaryMedium rounded-xl m-2 cursor-pointer duration-300 hover:text-primaryDark'
            >
              {navItem.text}
            </Link>
          </li>
        ))}
      </ul>
      {!auth.isAuthenticated ? (
        <div className='flex  gap-x-2'>
          <Link
            to={appRoutes.loginPage}
            className='px-4 py-2 hover:bg-primaryMedium rounded-xl m-2 cursor-pointer duration-300 hover:text-primaryDark border-2 border-primaryMedium'
          >
            Sign in
          </Link>
          <Link
            to={appRoutes.signupPage}
            className='px-4 py-2  hover:bg-primaryMedium rounded-xl m-2 cursor-pointer duration-300 hover:text-primaryDark border-2 border-primaryMedium'
          >
            Sign up
          </Link>
        </div>
      ) : (
        <div className='md:flex gap-x-8 items-center hidden '>
          <p className=''>
            Hi, <span className='text-primaryMedium'>{auth.user.username}!!</span>
          </p>
          <button
            onClick={logout}
            className='rounded-xl p-3 hover:bg-primaryMedium duration-300 hover:text-primaryDark cursor-pointer border-gray-600'
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {navOpenView ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      <div
        className={
          navOpenView
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-20 flex flex-col gap-y-3'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%] z-20  flex flex-col gap-y-3'
        }
      >
        <div className='flex flex-col items-center'>
          <h1
            className='w-full text-3xl font-bold text-primaryMedium m-4'
            onClick={() => navigate('/')}
          >
            OPSTECH.
          </h1>
          {auth.isAuthenticated && <p className='w-full py-2'>Hi {auth.user.username}!!</p>}
        </div>

        {/* Mobile Navigation Items */}

        {navItems.map((navItem, index) => (
          <div key={index}>
            <NavLink to={navItem.link} onClick={() => setNavOpenView(false)}>
              <p className='p-4 border-b rounded-xl hover:bg-primaryMedium duration-300 hover:text-primaryDark cursor-pointer border-gray-600'>
                {navItem.text}
              </p>
            </NavLink>
          </div>
        ))}
        {auth.isAuthenticated && (
          <button
            onClick={() => {
              setNavOpenView(false)
              void logout()
            }}
            className='p-4 border-b rounded-xl hover:bg-primaryMedium duration-300 hover:text-primaryDark cursor-pointer border-gray-600 text-left'
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Header
