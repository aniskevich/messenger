import React from 'react'
import {UserCard} from './UserCard'

type MessageType = {
  text: string
  user: any
}

export const Message: React.FC<MessageType> = props => {
  const { text, user } = props
  return (
      <div className={`message ${user.right ? 'right' : ''}`}>
        <UserCard header={user.username} text={user.status} right={user.right} />
        <div className='message__text'>
          <p>{text}</p>
        </div>
      </div>
  )
}
