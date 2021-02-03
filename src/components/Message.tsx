import React from 'react'
import {UserCard, UserType} from './UserCard'

type MessageType = {
  text: string
  user: UserType
}

export const Message: React.FC<MessageType> = props => {
  const { text, user } = props
  return (
      <div className={`message ${user.right ? 'right' : ''}`}>
        <UserCard {...user} />
        <div className='message__text'>
          <p>{text}</p>
        </div>
      </div>
  )
}
