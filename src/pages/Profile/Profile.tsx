import { FormEvent, useContext, useState } from 'react'
import { authContext } from '../../hooks/useAuth'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'
import { Alert, notification } from 'antd'
import Spinner from '../../components/Spinner'
import { AuthService } from '../../services/authService'
import { AxiosError } from 'axios'

const Profile = () => {
  const auth = useContext(authContext)
  const userDetails = auth.user
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [tempNewPassword, setTempNewPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()
    if (tempNewPassword !== newPassword)
      return api.error({
        message: undefined,
        description: 'Passwords do not match. Please re-type your password.',
        duration: 60,
      })
    try {
      setLoading(true)
      const response = await AuthService.changePassword(currentPassword, newPassword)
      api.success({
        message: 'Password Update',
        description: response.data as string,
        duration: 60,
      })
      setShowSuccessAlert(true)
      setCurrentPassword('')
      setNewPassword('')
      setTempNewPassword('')
    } catch (error) {
      const axiosError = error as AxiosError
      api.error({
        message: 'Password Update',
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
      <div className='p-10 w-full mx-auto '>
        <div className='p-10 w-full shadow-lg rounded-md'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl mb-6'>
            Profile
          </h1>
          <div className=' grid md:grid-cols-2 grid-cols-1 gap-x-16 gap-y-4 '>
            <div className='col-span-1'>
              <p className='text-gray-500 text-xs mb-0'> Username</p>
              <p className='font-semibold text-md mb-0'>{userDetails.username}</p>
              <p className='text-gray-500 text-xs mt-4 mb-0'>Email</p>
              <p className='font-semibold text-md mb-0'>{userDetails.email}</p>
              <p className='text-gray-500 text-xs mt-4 mb-0'>Administrator</p>
              <p className='font-semibold text-md mb-0 inline'>
                {userDetails.role === 'User' ? (
                  <>
                    No{' '}
                    <AiFillCloseCircle
                      className='text-red-600 inline-block mb-1'
                      style={{ color: 'red' }}
                    />
                  </>
                ) : (
                  <>
                    Yes{' '}
                    <AiFillCheckCircle
                      className='text-green-600 inline-block mb-1'
                      style={{ color: 'green' }}
                    />
                  </>
                )}
              </p>
            </div>
            <div className='col-span-1'>
              <p className='text-gray-500 text-xs mb-0'>First Name</p>
              <p className='font-semibold text-md mb-0'>{userDetails.firstName}</p>
              <p className='text-gray-500 text-xs mt-4 mb-0'>Last Name</p>
              <p className='font-semibold text-md mb-0'>{userDetails.lastName}</p>
            </div>
          </div>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl my-6'>
            Change Password
          </h1>
          <form className='space-y-4 md:space-y-6' onSubmit={(e) => handleChangePassword(e)}>
            <fieldset className='space-y-4 md:space-y-6' disabled={loading}>
              <div>
                <label
                  htmlFor='currentpassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Current Password
                </label>
                <input
                  type='password'
                  name='currentpassword'
                  id='currentpassword'
                  placeholder='••••••••'
                  className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full md:w-1/3 md:w-1/3 p-2.5'
                  required={true}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='reenterPassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  New Password
                </label>
                <input
                  type='password'
                  name='reenterPassword'
                  id='reenterPassword'
                  placeholder='••••••••'
                  className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full md:w-1/3 p-2.5'
                  required={true}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full md:w-1/3 p-2.5'
                  required={true}
                  value={tempNewPassword}
                  onChange={(e) => setTempNewPassword(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='w-full md:w-1/3 text-primaryLight bg-primaryDark hover:text-primaryDark hover:bg-primaryMedium  font-medium rounded-lg text-sm px-5 py-2.5 text-center '
              >
                Submit {loading && <Spinner size='md' className='ml-2' />}
              </button>
              {showSuccessAlert && (
                <Alert
                  message='Password Updated'
                  description='Password has been successfully updated.'
                  type='success'
                  showIcon
                />
              )}
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}

export default Profile
