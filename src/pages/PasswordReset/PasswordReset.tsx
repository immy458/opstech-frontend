import { FormEvent, useEffect, useState } from 'react'
import Spinner from '../../components/Spinner'
import { useSearchParams } from 'react-router-dom'
import { AuthService } from '../../services/authService'
import { Alert, notification } from 'antd'
import { AxiosError } from 'axios'

const ResetPassword = () => {
  const [api, contextHolder] = notification.useNotification()

  const [password, setPassword] = useState<string>('')
  const [tempPassword, setTempPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [disableForm, setDisableForm] = useState<boolean>(false)

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (password !== tempPassword) {
      return api.error({
        message: undefined,
        description: 'Passwords do not match. Please re-type your password.',
        duration: 60,
      })
    }
    try {
      setLoading(true)
      setDisableForm(true)

      if (token && userId && password) {
        const response: APIResult = await AuthService.resetPassword(password, token, userId)
        api.success({
          message: 'Email Sent',
          description: response.data as string,
          duration: 60,
        })
        setShowSuccessAlert(true)
      } else {
        setDisableForm(false)
        api.error({
          message: 'Reset Password',
          description: 'Token or User Id or Password is missing.',
          duration: 60,
        })
      }
    } catch (error) {
      setDisableForm(false)
      const axiosError = error as AxiosError
      api.error({
        message: 'Forgot Password',
        description: (axiosError.response?.data as APIResult).error || axiosError.message,
        duration: 60,
      })
    } finally {
      setLoading(false)
    }
  }

  const readTokenAndUserIdFromURL = () => {
    setToken(searchParams.get('token') ?? '')
    setUserId(searchParams.get('id') ?? '')
  }

  useEffect(() => {
    readTokenAndUserIdFromURL()
  }, [searchParams])

  return (
    <>
      {contextHolder}
      <div className='flex flex-col items-center pt-[10%]'>
        <div className='w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-primaryLight'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
              Reset Password
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={(e) => void handleResetPassword(e)}>
              <fieldset className='space-y-4 md:space-y-6' disabled={disableForm}>
                <div>
                  <label
                    htmlFor='password'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    New Password
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
                {showSuccessAlert && (
                  <Alert
                    message='Password Reset'
                    description='Password reset successful! Please log in to your account.'
                    type='success'
                    showIcon
                  />
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
