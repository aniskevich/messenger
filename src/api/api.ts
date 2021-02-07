const API_URL = 'http://localhost:3000'

export enum StatusCode {
  Success = 0,
  Error = 1
}

type CheckAuthResponseType = {
  statusCode: StatusCode
  message?: string
  user?: any
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
}

export const API = {
  async checkAuth(token: string): Promise<CheckAuthResponseType> {
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
  }
}