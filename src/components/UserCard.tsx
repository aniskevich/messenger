import React from 'react'

export type UserType = {
  username: string
  text: string
  right?: boolean
  date?: string
}

export const UserCard: React.FC<UserType> = props => {
  const { username, text, right } = props
  return (
    <div className={`user-card ${right ? 'right' : ''}`}>
      <div className='user-card__avatar'></div>
      <div className='user-card__text'>
        <h4>{username}</h4>
        <p>{text}</p>
      </div>
    </div>
  )
}