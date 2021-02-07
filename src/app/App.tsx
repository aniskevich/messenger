import React from 'react'
import {useSelector} from 'react-redux'

import {MessengerPage} from '../pages/MessengerPage'
import {AuthPage} from '../pages/AuthPage'
import {getIsAuth} from '../redux/selectors'

export const App: React.FC = () => {
  const isAuth = useSelector(getIsAuth())
  return (
    isAuth ? <MessengerPage /> : <AuthPage />
  )
}
