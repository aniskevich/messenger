import {ThunkAction} from 'redux-thunk'

import {RootState} from '../store'
import {StatusCode} from '../../api/api'
import {chatAPI, EntityType} from '../../api/chatAPI'

const initialState = {
  activeNavigation: 'chats',
  isLoading: false,
  chats: [] as Array<EntityType>,
  contacts: [] as Array<EntityType>
}

type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET_ACTIVE_NAVIGATION':
      return {...state, activeNavigation: action.payload}
    case 'IS_LOADING_TOGGLE':
      return {...state, isLoading: action.payload}
    case 'SET_CONTACTS':
      return {...state, contacts: action.payload}
    case 'SET_CHATS':
      return {...state, chats: action.payload}
    case 'ADD_CHAT':
      return {
        ...state,
        chats: state.chats.concat(action.payload.chat),
        contacts: state.contacts.filter(c => c._id !== action.payload.userId)
      }
    case 'REMOVE_CHAT':
      return {
        ...state,
        chats: state.chats.filter(c => c._id !== action.payload.chatId),
        contacts: state.contacts.concat(action.payload.user)
      }
    default:
      return state
  }
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
type ActionsType = ReturnType<InferValueTypes<typeof actions>>

export const actions = {
  setActiveNavigation: (payload: string) =>
    ({type: 'SET_ACTIVE_NAVIGATION', payload} as const),
  setIsLoading: (payload: boolean) =>
    ({type: 'IS_LOADING_TOGGLE', payload} as const),
  setContacts: (payload: Array<EntityType>) =>
    ({type: 'SET_CONTACTS', payload} as const),
  setChats: (payload: Array<EntityType>) =>
    ({type: 'SET_CHATS', payload} as const),
  addChat: (chat: EntityType, userId: string) =>
    ({type: 'ADD_CHAT', payload: {chat, userId}} as const),
  removeChat: (user: EntityType, chatId: string) =>
    ({type: 'REMOVE_CHAT', payload: {user, chatId}} as const)
}

export const initialize = (): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  dispatch(actions.setIsLoading(true))
  const token = localStorage.getItem('token')
  try {
    const data = await chatAPI.getEntities(token)
    if (data.statusCode === StatusCode.Success) {
      dispatch(actions.setContacts(data.contacts))
      dispatch(actions.setChats(data.chats))
    }
    dispatch(actions.setIsLoading(false))
  } catch (e) {
    console.warn(e.message)
    dispatch(actions.setIsLoading(false))
  }
}

export const createChat = (
  userId: string
): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  dispatch(actions.setIsLoading(true))
  const token = localStorage.getItem('token')
  try {
    const data = await chatAPI.createChat(userId, token)
    if (data.statusCode === StatusCode.Success) {
      dispatch(actions.addChat(data.entity, data.entityId))
    }
    dispatch(actions.setIsLoading(false))
  } catch (e) {
    console.warn(e.message)
    dispatch(actions.setIsLoading(false))
  }
}

export const deleteChat = (
 chatId: string
): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  dispatch(actions.setIsLoading(true))
  const token = localStorage.getItem('token')
  try {
    const data = await chatAPI.deleteChat(chatId, token)
    if (data.statusCode === StatusCode.Success) {
      dispatch(actions.removeChat(data.entity, data.entityId))
    }
    dispatch(actions.setIsLoading(false))
  } catch (e) {
    console.warn(e.message)
    dispatch(actions.setIsLoading(false))
  }
}
