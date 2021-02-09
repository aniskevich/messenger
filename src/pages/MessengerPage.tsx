import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Navbar} from '../components/Navbar'
import {Sidebar} from '../components/Sidebar'
import {Chat} from '../components/Chat'
import {getActiveNavigation, getEntities} from '../redux/selectors'
import {initialize} from '../redux/reducers/appReducer'

export const MessengerPage: React.FC = () => {
  const dispatch = useDispatch()
  const title = useSelector(getActiveNavigation())
  const entities = useSelector(getEntities[title]())

  useEffect(() => {
    dispatch(initialize())
  }, [])

  return (
    <div className='container'>
      <Navbar/>
      <Sidebar title={title} entities={entities}/>
      <Chat/>
    </div>
  )
}
