import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Navbar} from '../components/Navbar'
import {Sidebar} from '../components/Sidebar'
import {Chat} from '../components/Chat'
import {getActiveChatId, getActiveNavigation, getEntities, getIsProfileVisible} from '../redux/selectors'
import {initialize} from '../redux/reducers/appReducer'
import {Profile} from '../components/Profile'

export const MessengerPage: React.FC = () => {
  const dispatch = useDispatch()
  const title = useSelector(getActiveNavigation())
  const entities = useSelector(getEntities[title]())
  const isVisibleProfile = useSelector(getIsProfileVisible())
  const activeChatId = useSelector(getActiveChatId())

  useEffect(() => {
    dispatch(initialize())
  }, [])

  return (
    <div className='container'>
      <Navbar/>
      <Sidebar title={title} entities={entities}/>
      {activeChatId ? <Chat/> : <div></div>}
      {isVisibleProfile && <Profile/>}
    </div>
  )
}
