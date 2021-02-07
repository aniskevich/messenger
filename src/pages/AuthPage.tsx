import React, {useEffect} from 'react'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'

import {auth, checkAuth} from '../redux/reducers/userReducer'
import {getIsLoading} from '../redux/selectors'
import {Loader} from '../components/Loader'

export const AuthPage: React.FC = () => {
  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  const dispatch = useDispatch()

  const isLoading = useSelector(getIsLoading())

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      action: ''
    },
    onSubmit: (values, { setFieldError }) => {
      setFieldError('action', '')
      dispatch(auth(values, setFieldError))
    },
  })

  if (isLoading) return <Loader/>

  return (
    <div className='auth-container'>
      <div className='auth'>
        <form className='form' onSubmit={formik.handleSubmit}>
          <input
            id='email'
            name='email'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder='Email'
          />
          <input
            id='password'
            name='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder='Password'
          />
          {formik.errors.action ? <div className='form__error'>{formik.errors.action}</div> : ''}
          <div className='form__buttons'>
            <button
              className='signin'
              type='submit'
              onClick={() => formik.setFieldValue('action', 'signIn')}
            >
              Sign In
            </button>
            <button
              className='signup'
              type='submit'
              onClick={() => formik.setFieldValue('action', 'signUp')}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
