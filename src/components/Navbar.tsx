import React from 'react'
import {logout} from '../redux/reducers/userReducer'
import {useDispatch} from 'react-redux'

export const Navbar: React.FC = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <nav className="navbar">
      <ul className="list">
        <li className="list__item">
          <i className="material-icons">chat</i>
        </li>
        <li className="list__item">
          <i className="material-icons">person</i>
        </li>
        <li className="list__item">
          <i className="material-icons">account_circle</i>
          <div className="submenu">
            <button>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </li>
      </ul>
    </nav>
  )
}
