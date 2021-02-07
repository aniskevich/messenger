import React from 'react'

import {Navbar} from '../components/Navbar'
import {Sidebar} from '../components/Sidebar'
import {Chat} from '../components/Chat'

const users = [
  {username: 'Byrom Guittet', text: 'What\'s up, how are you?', date: 'Yesterday'},
  {username: 'Forest Kroch', text: 'Photo', date: '10:22'},
  {username: 'Marvin Rohan', text: 'Have you prepared the files?', date: '22:43'}
]



export const MessengerPage: React.FC = () => {
  return (
    <div className='container'>
      <Navbar/>
      <Sidebar title='chats' users={users}/>
      <Chat user={users[1]}/>
    </div>
  )
}
