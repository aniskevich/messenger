import {ThunkAction} from 'redux-thunk'

import {RootState} from '../store'
import {chatAPI, EntityType} from '../../api/chatAPI'
import {messageAPI} from '../../api/messageAPI'
import {StatusCode} from '../../constants'
import {setMessages, setMessage} from './messageReducer'

const initialState = {
  activeNavigation: 'chats',
  isLoading: false,
  chats: [] as Array<EntityType>,
  contacts: [] as Array<EntityType>,
  isProfileVisible: false,
  activeChatId: '',
  subscriber: null as (() => void) | null
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
    case 'SET_IS_PROFILE_VISIBLE':
      return {...state, isProfileVisible: action.payload}
    case 'SET_ACTIVE_CHAT_ID':
      return {...state, activeChatId: action.payload}
    case 'SET_SUBSCRIBER':
      return {...state, subscriber: action.payload}
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
    ({type: 'REMOVE_CHAT', payload: {user, chatId}} as const),
  setIsProfileVisible: (payload: boolean) =>
    ({type: 'SET_IS_PROFILE_VISIBLE', payload} as const),
  setActiveChatId: (payload: string) =>
    ({type: 'SET_ACTIVE_CHAT_ID', payload} as const),
  setSubscriber: (payload: () => void | null) =>
    ({type: 'SET_SUBSCRIBER', payload} as const),
}

export const initialize = (): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  dispatch(actions.setIsLoading(true))
  const token = localStorage.getItem('token')
  try {
    const data = await chatAPI.getEntities(token)
    if (data.statusCode === StatusCode.Success) {
      dispatch(actions.setContacts(data.contacts))
      dispatch(actions.setChats(data.chats))
      messageAPI.start(token, (messages) => {
        dispatch(setMessages(messages))
      })
      const unsub = messageAPI.subscribe((message) => {
        dispatch(setMessage(message))
      })
      dispatch(actions.setSubscriber(unsub))
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
      dispatch(actions.setActiveChatId(data.entity._id))
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

export const cleanUp = (): ThunkAction<void, RootState, undefined, ActionsType> => (dispatch, getState) => {
  getState().app.subscriber()
  dispatch(actions.setSubscriber(null))
  dispatch(actions.setActiveChatId(''))
  messageAPI.stop()
}
