import {API_URL, StatusCode} from '../constants'

export type EntityType = {
  _id: string
  name: string
  text: string
  info: string
}

type GetEntityResponseType = {
  statusCode: StatusCode
  message?: string
  entity?: EntityType
  entityId?: string
}

type GetEntitiesResponseType = {
  statusCode: StatusCode
  message?: string
  contacts?: Array<EntityType>
  chats?: Array<EntityType>
}

export const chatAPI = {
  async createChat(userId: string, token: string): Promise<GetEntityResponseType> {
    try {
      const response = await fetch(`${API_URL}/chats/${userId}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return await response.json()
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async deleteChat(chatId: string, token: string): Promise<GetEntityResponseType> {
    try {
      const response = await fetch(`${API_URL}/chats/${chatId}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return await response.json()
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async getEntities(token: string): Promise<GetEntitiesResponseType> {
    try {
      const response = await fetch(`${API_URL}/chats/init`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      return await response.json()
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
