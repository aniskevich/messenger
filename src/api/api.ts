import {API_URL, StatusCode} from '../constants'

export type UserType = {
  _id: string
  username: string
  email: string
  status: string
  info: string
}

export type AuthRequestDataType = {
  email: string
  password: string
  action: string
}

type AuthResponseType = {
  statusCode: StatusCode
  message?: string
  token?: string
  user?: UserType
}

export const API = {
  async checkAuth(token: string): Promise<AuthResponseType> {
    try {
      const response = await fetch(`${API_URL}/auth/`, {
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
  },
  async auth(values: AuthRequestDataType): Promise<AuthResponseType> {
    try {
      const response = await fetch(`${API_URL}/auth/${values.action}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      return await response.json()
    } catch (e) {
      throw new Error(e.message)
    }
  },
  async updateProfile(values: UserType, token: string): Promise<AuthResponseType> {
    try {
      const response = await fetch(`${API_URL}/auth/update`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(values)
      })
      return await response.json()
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
