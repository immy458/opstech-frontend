import React, { useState } from 'react'
import LoginForm from './LoginForm'
import ForgotPasswordForm from './ForgotPasswordForm'

const Login: React.FC = () => {
  const [showForgotPasswordUI, setShowForgotPasswordUI] = useState(false)

  return (
    <div className='grid md:grid-cols-3 p-20 w-full grid-cols-1'>
      <div className='md:col-span-1 flex flex-col items-end justify-center'>
        <img
          src='https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg'
          className='w-[500px]'
          alt='Phone image'
        />
      </div>
      <div className='md:col-span-2 flex flex-col items-center'>
        <div className='w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-primaryLight'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-primaryMedium md:text-2xl'>
              {showForgotPasswordUI ? 'Forgot Password' : 'Sign in to your account'}
            </h1>
            {showForgotPasswordUI ? (
              <ForgotPasswordForm setShowForgotPasswordUI={setShowForgotPasswordUI} />
            ) : (
              <LoginForm setShowForgotPasswordUI={setShowForgotPasswordUI} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
