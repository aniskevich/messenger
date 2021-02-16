import React, {FormEvent, useState} from 'react'
import {useSelector} from 'react-redux'

import {UserCard} from './UserCard'
import {Message} from './Message'
import {getChat, getCurrentUser, getMessage} from '../redux/selectors'
import {sendMessage} from '../redux/reducers/messageReducer'

export const Chat: React.FC = () => {
  const [message, setMessage] = useState('')

  const chat = useSelector(getChat())
  const user = useSelector(getCurrentUser())
  const messages = useSelector(getMessage(chat._id))

  const toMessage = (message: any) => {
    const date = new Date(message.createdAt)
    const u = {
      username: message.authorId === user._id ? user.username : chat.name,
      right: message.authorId === user._id
    }
    return <Message
      message={message.message}
      user={u}
      date={`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
      key={message._id}
    />
  }

  const handleSubmit = (event: FormEvent) => {
    const obj = {chatId: chat._id, authorId: user._id, message}
    event.preventDefault()
    sendMessage(obj)
    setMessage('')
  }

  const handleInput = (event: any) => {
    setMessage(event.currentTarget.value)
  }

  return (
    <div className='chat'>
      <div className='chat__header'>
        <UserCard header={chat.name} text={chat.info}/>
      </div>
      <div className='chat__content'>
        {messages.map(toMessage)}
      </div>
      <div className='chat__footer'>
        <form className='form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Write a message' value={message} onInput={handleInput}/>
          <button type='submit'><i className='material-icons'>send</i></button>
        </form>
      </div>
    </div>
  )
}
