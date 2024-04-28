import { FormEvent, useContext, useState } from 'react'
import { AuthService } from '../../services/authService'
import { initialUserState } from '../../constants/initialStates'
import Spinner from '../../components/Spinner'
import { AxiosError } from 'axios'
import { notification } from 'antd'
import { authContext } from '../../hooks/useAuth'

const Signup = () => {
  const [user, setUser] = useState<User>(initialUserState)
  const [disableForm, setDisableForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()
  const auth = useContext(authContext)
  const [tempPassword, setTempPassword] = useState<string>('')

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault()
    if (tempPassword !== user.password) {
      return api.error({
        message: undefined,
        description: 'Passwords do not match. Please re-type your password.',
        duration: 60,
      })
    }
    try {
      setLoading(true)
      setDisableForm(true)
      await AuthService.signup(user)
      api.success({
        message: 'Sign Up',
        description: 'Sign up successful.',
        duration: 30,
      })
      setTimeout(async () => {
        await auth.signIn(user.username, user.password ?? '')
      }, 1000)
    } catch (error) {
      setDisableForm(false)
      const axiosError = error as AxiosError
      api.error({
        message: 'Sign Up',
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
      <div className='flex flex-col items-center pt-[10%]'>
        <div className='w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-primaryLight'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
              Register
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleSignup(e)}>
              <fieldset className='space-y-4 md:space-y-6' disabled={disableForm}>
                <div>
                  <label
                    htmlFor='username'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Username
                  </label>
                  <input
                    name='username'
                    id='username'
                    placeholder='Ennter username'
                    className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
                    required={true}
                    value={user.username}
                    onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    First Name
                  </label>
                  <input
                    name='firstName'
                    id='firstName'
                    placeholder='Enter First Name'
                    className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
                    required={true}
                    value={user.firstName}
                    onChange={(e) => setUser((prev) => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Last Name
                  </label>
                  <input
                    name='lastName'
                    id='lastName'
                    placeholder='Enter Last Name'
                    className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
                    required={true}
                    value={user.lastName}
                    onChange={(e) => setUser((prev) => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
                    placeholder='Enter your email'
                    required={true}
                    value={user.email}
                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
                    required={true}
                    value={user.password}
                    onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
                  />
                </div>
                <div>
                  <label
                    htmlFor='reenterPassword'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Re-enter New Password
                  </label>
                  <input
                    type='password'
                    name='reenterPassword'
                    id='reenterPassword'
                    placeholder='••••••••'
                    className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
                    required={true}
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                  />
                </div>
                <button
                  type='submit'
                  className='w-full text-primaryLight bg-primaryDark hover:text-primaryDark hover:bg-primaryMedium  font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                >
                  Submit {loading && <Spinner size='md' className='ml-2' />}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
