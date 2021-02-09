import React from 'react'

import {NavbarItem} from './NavbarItem'

export const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <ul className='list'>
        <NavbarItem name='chats' iconName='chat'/>
        <NavbarItem name='contacts' iconName='person'/>
        <NavbarItem name='actions' iconName='account_circle'/>
      </ul>
    </nav>
  )
}