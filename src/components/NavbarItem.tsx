import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {getActiveNavigation} from '../redux/selectors'
import {actions} from '../redux/reducers/appReducer'
import {logout} from '../redux/reducers/authReducer'

export const NavbarItem: React.FC<{name: string, iconName: string}> = ({name, iconName}) => {
  const dispatch = useDispatch()

  const activeButton = useSelector(getActiveNavigation())
  const className = `list__item ${activeButton === name ? 'active' : ''}`

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const title = event.currentTarget.dataset.type
    dispatch(actions.setActiveNavigation(title))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  if (name === 'actions') {
    return (
      <li className='list__item'>
        <i className='material-icons'>{iconName}</i>
        <div className='submenu'>
          <button>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </li>
    )
  } else {
    return (
      <li className={className} data-type={name} onClick={handleClick}>
        <i className='material-icons'>{iconName}</i>
      </li>
    )
  }
}