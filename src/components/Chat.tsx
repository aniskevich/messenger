import React from 'react'
import {useSelector} from 'react-redux'

import {UserCard} from './UserCard'
import {Message} from './Message'
import {getChat} from '../redux/selectors'

export const Chat: React.FC = () => {
  const chat = useSelector(getChat())
  return (
    <div className='chat'>
      <div className='chat__header'>
        <UserCard header={chat.name} text={chat.info}/>
      </div>
      <div className='chat__content'>
      {/*  {messages.map(message => <Message {...message} key={message._id}/>)}*/}
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
