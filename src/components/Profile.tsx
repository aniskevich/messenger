import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getCurrentUser} from '../redux/selectors'
import {actions} from '../redux/reducers/appReducer'
import {useFormik} from 'formik'
import {updateProfile} from '../redux/reducers/authReducer'

export const Profile: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser())

  const handleProfileIsVisible = () => {
    dispatch(actions.setIsProfileVisible(false))
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      dispatch(updateProfile(values))
    },
  })

  return (
    <div className='profile'>
      <header>
        <div className='profile__header'>
          Profile
        </div>
        <button onClick={handleProfileIsVisible}>Close</button>
      </header>
      <div className='profile__info'>
        <div className='avatar'></div>
        <form className='form' onSubmit={formik.handleSubmit}>
          <input
            id='username'
            name='username'
            type='text'
            value={formik.values.username}
            onChange={formik.handleChange}
            className='username'
          />
          <input
            id='status'
            name='status'
            type='text'
            value={formik.values.status}
            onChange={formik.handleChange}
            className='status'
          />
          <div className='label'>User information:</div>
          <input
            id='info'
            name='info'
            type='text'
            value={formik.values.info}
            onChange={formik.handleChange}
            className='text'
          />
          <div className='label'>User email:</div>
          <div className='text'>{formik.values.email}</div>
          <div className='form__buttons'>
            <button type='submit'>Change</button>
          </div>
        </form>
      </div>
    </div>
  )
}