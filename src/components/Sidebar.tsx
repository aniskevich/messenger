import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {SidebarItem} from './SidebarItem'
import {createChat, deleteChat, actions} from '../redux/reducers/appReducer'
import {Loader} from './Loader'
import {getActiveChatId, getIsLoadingSidebar} from '../redux/selectors'
import {EntityType} from '../api/chatAPI'

type SidebarPropsType = {
  title: string
  entities: Array<EntityType>
}

export const Sidebar: React.FC<SidebarPropsType> = ({title, entities}) => {
  const actionName = title === 'chats' ? 'close' : 'add'
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsLoadingSidebar())
  const activeChatId = useSelector(getActiveChatId())

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement
    if (target.hasAttribute('data-type')) {
      const action = target.getAttribute('data-type')
      const id = target.getAttribute('data-id')
      if (action === 'add') {
        dispatch(createChat(id))
      } else if (action === 'close') {
        dispatch(deleteChat(id))
        if (id === activeChatId) {
          dispatch(actions.setActiveChatId(''))
        }
      }
    } else if (target.hasAttribute('data-chat')) {
      const id = target.getAttribute('data-chat')
      dispatch(actions.setActiveChatId(id))
    }
  }

  if (isLoading) return <Loader/>
  return (
    <div className='sidebar'>
      <header className='sidebar__header'>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </header>
      <form className='form'>
        <input type='text' placeholder={`Search in ${title}`}/>
      </form>
      <div className='list' onClick={handleClick}>
        {entities.length > 0 && entities.map(entity =>
          <SidebarItem
            _id={entity._id}
            header={entity.name}
            text={entity.text}
            actionName={actionName}
            spanText={entity.info}
            key={entity._id}
          />
        )}
      </div>
    </div>
  )
}
