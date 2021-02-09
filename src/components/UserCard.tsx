import React from 'react'

export type UserCardPropsType = {
  header: string
  text: string
  right?: boolean
}

export const UserCard: React.FC<UserCardPropsType> = props => {
  const {header, text, right} = props
  return (
    <div className={`user-card ${right ? 'right' : ''}`}>
      <div className='user-card__avatar'></div>
      <div className='user-card__text'>
        <h4>{header}</h4>
        <p>{text}</p>
      </div>
    </div>
  )
}