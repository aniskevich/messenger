import React from 'react'
import {UserCard} from './UserCard'

type MessageType = {
  message: string
  user: any
  date: string
}

export const Message: React.FC<MessageType> = props => {
  const { message, user, date } = props
  return (
      <div className={`message ${user.right ? 'right' : ''}`}>
        <UserCard header={user.username} text={date} right={user.right} />
        <div className='message__text'>
          <p>{message}</p>
        </div>
      </div>
  )
}
