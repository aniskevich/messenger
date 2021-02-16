import {messageAPI, MessageType, SendMessageType} from '../../api/messageAPI'
import {ThunkAction} from 'redux-thunk'
import {RootState} from '../store'

const initialState = {
  messages: [] as Array<MessageType>
}

type InitialStateType = typeof initialState
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
type ActionsType = ReturnType<InferValueTypes<typeof actions>>

export const messageReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch(action.type) {
    case 'SET_MESSAGES':
      return {...state, messages: [...action.payload]}
    case 'SET_MESSAGE':
      return {...state, messages: state.messages.concat(action.payload)}
    default: return state
  }
}

const actions = {
  setMessages: (payload: Array<MessageType>) => ({type: 'SET_MESSAGES', payload} as const),
  setMessage: (payload: MessageType) => ({type: 'SET_MESSAGE', payload} as const)
}

export const sendMessage = (data: SendMessageType): void => {
  messageAPI.sendMessage(data)
}

export const setMessages = (
  data: Array<MessageType>
): ThunkAction<void, RootState, undefined, ActionsType> => dispatch => {
  dispatch(actions.setMessages(data))
}

export const setMessage = (
  data: MessageType
): ThunkAction<void, RootState, undefined, ActionsType> => dispatch => {
  dispatch(actions.setMessage(data))
}
