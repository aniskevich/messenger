import React from 'react'
import {isAuth} from '../app/App'
import {Redirect} from 'react-router-dom'

export const AuthPage: React.FC = () => {
  if (isAuth) return <Redirect to='/' />
  return (
    <div className='auth-container'>
      <div className='auth'>
        <form className='form'>
          <input type='text' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <div className='form__buttons'>
            <button className='signin'>Sign In</button>
            <button className='signup'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
