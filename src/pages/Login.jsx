import { LoginForm } from '@/components/Login/LoginForm'
import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="flex mr-auto items-center justify-center max-xl:flex-col-reverse mt-10 ">
      {/* Login Form! */}
      <div className="w-2/5 max-xl:w-full max-xl:mt-20 bg-white">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
