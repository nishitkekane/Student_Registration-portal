import { LoginForm } from '@/components/Login/LoginForm'
import React from 'react'
import logo from '../assets/logo.png'
import './Login.css'
import { SkeletonCard } from '@/components/Extra/SkeletonCard'

const Login = () => {
  return (
    <div className="flex mr-auto items-center justify-center max-xl:flex-col-reverse mt-10">
      {/* Image! */}
      <div className="w-3/5 flex justify-center items-center max-xl:mt-5 max-xl:w-full">
        <img
          src={logo}
          height={200}
          width={200}
          className="transition-transform duration-500 transform hover:-rotate-45 max-xl:hidden"
          alt="lemon"
        />
      </div>

      {/* Login Form! */}
      <div className="w-2/5 max-xl:w-full max-xl:mt-20">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
