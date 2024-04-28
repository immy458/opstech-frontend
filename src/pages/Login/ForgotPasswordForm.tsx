import React, { FormEvent, SetStateAction, useState } from 'react'
import Spinner from '../../components/Spinner'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { AuthService } from '../../services/authService'
import { Alert, notification } from 'antd'
import { AxiosError } from 'axios'

interface IPROPS {
  setShowForgotPasswordUI: React.Dispatch<SetStateAction<boolean>>
}

const ForgotPasswordForm: React.FC<IPROPS> = ({ setShowForgotPasswordUI }: IPROPS) => {
  const [api, contextHolder] = notification.useNotification()

  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false)
  const [disableForm, setDisableForm] = useState<boolean>(false)

  const handleForgotPassword = async (e: FormEvent) => {
    try {
      e.preventDefault()
      setLoading(true)
      setDisableForm(true)
      const response: APIResult = await AuthService.requestPasswordReset(email)
      api.success({
        message: 'Email Sent',
        description: response.data as string,
        duration: 60,
      })
      setShowSuccessAlert(true)
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

  return (
    <>
      {contextHolder}
      <form className='space-y-4 md:space-y-6' onSubmit={(e) => void handleForgotPassword(e)}>
        <fieldset className='space-y-4 md:space-y-6' disabled={disableForm}>
          <div>
            <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900'>
              Your email
            </label>
            <input
              type='email'
              name='username'
              id='username'
              className=' border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-full p-2.5'
              placeholder='Enter your email'
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            disabled={disableForm}
            type='submit'
            className='w-full text-primaryLight bg-primaryDark hover:text-primaryDark hover:bg-primaryMedium  font-medium rounded-lg text-sm px-5 py-2.5 text-center '
          >
            Submit {loading && <Spinner size='md' className='ml-2' />}
          </button>
          {showSuccessAlert && (
            <Alert
              message='Email Sent'
              description="We've sent an email with a password reset link to your address. Check your inbox and spam folder for the email, and click the link to reset your password."
              type='success'
              showIcon
            />
          )}
        </fieldset>
        <button
          className='text-primaryLight bg-primaryDark hover:text-primaryDark hover:bg-primaryMedium  rounded-lg text-sm px-3 py-2'
          onClick={() => {
            setShowForgotPasswordUI(false)
            setDisableForm(false)
            setShowSuccessAlert(false)
          }}
          disabled={loading}
        >
          <AiOutlineArrowLeft className='inline-block mr-2 mb-1' />
          <span>Go Back</span>
        </button>
      </form>
    </>
  )
}

export default ForgotPasswordForm
