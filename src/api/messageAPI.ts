import {io, Socket} from 'socket.io-client'
import {WS_URL} from '../constants'

let channel: Socket
let subscribers = [] as Array<SubscriberType>

const init = () => {
  channel = io(WS_URL)
}

export type MessageType = {
  _id: string
  chatId: string
  authorId: string
  message: string
  createdAt: string
}

type SubscriberType = (message: MessageType) => void

export type SendMessageType = {
  chatId: string
  authorId: string
  message: string
}

export const messageAPI = {
  start: (token: string, callback: (messages: Array<MessageType>) => void): void => {
    init()
    channel.on('connect', () => {
      channel.emit('init', token)
    })
    channel.on('message', (data: string) => {
      subscribers.forEach((sub: SubscriberType) => sub(JSON.parse(data)))
    })
    channel.on('init', (data: string) => callback(JSON.parse(data)))
  },
  subscribe: (cb: SubscriberType): () => void => {
    subscribers.push(cb)
    return () => subscribers = subscribers.filter((sub: SubscriberType) => sub !== cb)
  },
  sendMessage: (message: SendMessageType): void => {
    channel.emit('message', JSON.stringify(message))
  },
  stop: () => {
    channel.disconnect()
  }
}
