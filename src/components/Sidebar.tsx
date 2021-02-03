import React from 'react'
import {UserCard, UserType} from './UserCard'

type SidebarType = {
  title: string
  users: Array<UserType>
}

export const Sidebar: React.FC<SidebarType> = props => {
  const { title, users } = props
  return (
    <div className='sidebar'>
      <header className='sidebar__header'>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </header>
      <form className='form'>
        <input type='text' placeholder={`Search in ${title}`}/>
      </form>
      <div className='list'>
        {users.map(user => {
          return (
            <div className='list__item'>
              <span>{user.date}</span>
              <UserCard {...user}/>
              <div className='actions'>
                <i className='material-icons'>close</i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}