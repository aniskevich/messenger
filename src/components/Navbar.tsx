import React from 'react'

export const Navbar: React.FC = () => {
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
        </li>
      </ul>
    </nav>
  )
}
