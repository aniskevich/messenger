import React from 'react'
import {UserCard, UserType} from './UserCard'
import {Message} from './Message'

type ChatType = {
  user: UserType
}

export const Chat: React.FC<ChatType> = props => {
  const { user } = props
  const messages = [
    {text: 'Thank you so much. These files are very important to me. I guess you didn\'t ' +
        'make any changes to these files. So I need the original versions of these files. ' +
        'Thank you very much again.', user: {...user, text: '22:01'}},
    {text: 'I thank you. We are glad to help you.', user: {username: 'Margaretta Worvell', text: '22:04', right: true}},
  ]
  return (
    <div className='chat'>
      <div className='chat__header'>
        <UserCard {...user}/>
      </div>
      <div className='chat__content'>
        {messages.map(message => <Message {...message}/>)}
      </div>
      <div className='chat__footer'>
        <form className='form'>
          <input type='text' placeholder='Write a message'/>
          <button><i className='material-icons'>send</i></button>
        </form>
      </div>
    </div>
  )
}
