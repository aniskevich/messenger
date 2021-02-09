import React from 'react'
import {UserCard} from './UserCard'
import {Message} from './Message'

const user = {username: 'Byrom Guittet', status: 'What\'s up, how are you?', info: 'Yesterday'}

export const Chat: React.FC = () => {
  const messages = [
    {text: 'Thank you so much. These files are very important to me. I guess you didn\'t ' +
        'make any changes to these files. So I need the original versions of these files. ' +
        'Thank you very much again.', user: {...user, status: '22:01'}},
    {text: 'I thank you. We are glad to help you.', user: {username: 'Margaretta Worvell', status: '22:04', right: true}},
  ]
  return (
    <div className='chat'>
      <div className='chat__header'>
        <UserCard header={user.username} text={user.status}/>
      </div>
      <div className='chat__content'>
        {messages.map(message => <Message {...message} key={Math.random()}/>)}
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
