import React from 'react'

import {UserCard} from './UserCard'

type SidebarItemPropsType = {
  _id: string
  header: string
  text: string
  actionName: string
  spanText: string
}

export const SidebarItem: React.FC<SidebarItemPropsType> = props => {
  const {_id, actionName, spanText, ...cardItem} = props
  return (
    <div className='list__item'>
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
