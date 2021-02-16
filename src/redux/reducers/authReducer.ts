import {ThunkAction} from 'redux-thunk'

import {RootState} from '../store'
import {API, AuthRequestDataType, UserType} from '../../api/api'
import {StatusCode} from '../../constants'
import {cleanUp} from './appReducer'

const initialState = {
  isLoading: false,
  isAuth: false,
  currentUser: null as UserType
}

type InitialStateType = typeof initialState

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'IS_LOADING_TOGGLE':
      return {...state, isLoading: action.payload}
    case 'SET_IS_AUTH':
      return {...state, isAuth: action.payload}
    case 'SET_CURRENT_USER':
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
type ActionsType = ReturnType<InferValueTypes<typeof actions>>

const actions = {
  setIsLoading: (payload: boolean) =>
    ({type: 'IS_LOADING_TOGGLE', payload} as const),
  setIsAuth: (payload: boolean) =>
    ({type: 'SET_IS_AUTH', payload} as const),
  setCurrentUser: (payload: UserType) =>
    ({type: 'SET_CURRENT_USER', payload} as const)
}

export const auth = (
  values: AuthRequestDataType,
  setFieldError: (name: string, error: string) => void
): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  dispatch(actions.setIsLoading(true))
  try {
    const data = await API.auth(values)
    if (data.statusCode === StatusCode.Success) {
      localStorage.setItem('token', data.token)
      dispatch(actions.setCurrentUser(data.user))
      dispatch(actions.setIsAuth(true))
    } else if (data.statusCode === StatusCode.Error) {
      setFieldError('action', data.message)
    }
    dispatch(actions.setIsLoading(false))
  } catch (e) {
    setFieldError('action', 'Connection error: ' + e.message)
    dispatch(actions.setIsLoading(false))
  }
}

export const logout = (): ThunkAction<void, RootState, undefined, ActionsType> => dispatch => {
  localStorage.removeItem('token')
  dispatch(cleanUp())
  dispatch(actions.setCurrentUser(null))
  dispatch(actions.setIsAuth(false))
}

export const checkAuth = (): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  const token = localStorage.getItem('token')
  if (token) {
    dispatch(actions.setIsLoading(true))
    try {
      const data = await API.checkAuth(token)
      if (data.statusCode === StatusCode.Success) {
        dispatch(actions.setCurrentUser(data.user))
        dispatch(actions.setIsAuth(true))
      } else if (data.statusCode === StatusCode.Error) {
        localStorage.removeItem('token')
        dispatch(actions.setCurrentUser(null))
        dispatch(actions.setIsAuth(false))
      }
      dispatch(actions.setIsLoading(false))
    } catch (e) {
      console.warn(e.message)
      dispatch(actions.setIsLoading(false))
    }
  }
}

export const updateProfile = (
  values: UserType
): ThunkAction<void, RootState, undefined, ActionsType> => async dispatch => {
  const token = localStorage.getItem('token')
  try {
    const data = await API.updateProfile(values, token)
    if (data.statusCode === StatusCode.Success) {
      dispatch(actions.setCurrentUser(data.user))
    } else if (data.statusCode === StatusCode.Error) {
      console.warn(data.message)
    }
  } catch (e) {
    console.warn(e.message)
  }
}
