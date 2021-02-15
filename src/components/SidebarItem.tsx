import React from 'react'

import {UserCard} from './UserCard'
import {useSelector} from 'react-redux'
import {getActiveChatId} from '../redux/selectors'

type SidebarItemPropsType = {
  _id: string
  header: string
  text: string
  actionName: string
  spanText: string
}

export const SidebarItem: React.FC<SidebarItemPropsType> = props => {
  const {_id, actionName, spanText, ...cardItem} = props
  const activeChatId = useSelector(getActiveChatId())
  const className = `list__item ${_id === activeChatId ? 'active' : ''}`
  return (
    <div className={className} {... actionName === 'close' ? {'data-chat': _id} : {}}>
      <span>{spanText}</span>
      <UserCard {...cardItem}/>
      <div className='actions'>
        <i
          className='material-icons'
          data-type={actionName}
          data-id={_id}
        >
          {actionName}
        </i>
      </div>
    </div>
  )
}
