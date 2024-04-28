import { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react'
import Spinner from '../../components/Spinner'
import { authContext } from '../../hooks/useAuth'
import { notification } from 'antd'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

interface IPROS {
  setShowForgotPasswordUI: Dispatch<SetStateAction<boolean>>
}
const LoginForm = ({ setShowForgotPasswordUI }: IPROS) => {
  const [api, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const auth = useContext(authContext)

  const handleSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      await auth.signIn(username, password)
      api.success({
        message: 'Sign In',
        description: 'Sign in successful.',
        duration: 30,
      })
      navigate('/')
    } catch (error) {
      const axiosError = error as AxiosError
      api.error({
        message: 'Sign In',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleSignIn(e)}>
        <div>
          <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900'>
            Your username
          </label>
          <input
            name='username'
            id='username'
            className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
            placeholder='Enter your username'
            required={true}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
            Password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            placeholder='••••••••'
            className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
            required={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <span
            className='text-sm font-medium text-primary-600 hover:underline cursor-pointer '
            onClick={() => setShowForgotPasswordUI(true)}
          >
            Forgot password?
          </span>
        </div>
        <div className='flex items-center justify-center'>
          <button
            disabled={loading}
            type='submit'
            className='w-full bg-primaryDark text-primaryLight hover:text-primaryDark hover:text-black hover:bg-primaryMedium focus:ring-4 focus:outline-none focus:ring-primaryLight font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:cursor-pointer '
          >
            Sign in {loading && <Spinner size='md' className='ml-2' />}
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
