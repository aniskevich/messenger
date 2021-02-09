import { RootState } from './store'
import {EntityType} from '../api/chatAPI'

export const getIsAuth = () => (state: RootState): boolean => state.auth.isAuth
export const getIsLoadingAuth = () => (state: RootState): boolean => state.auth.isLoading

export const getActiveNavigation = () => (state: RootState): string => state.app.activeNavigation

type GetEntitiesType = {
  [key: string]: () => (state: RootState) => Array<EntityType>
}

export const getEntities: GetEntitiesType = {
  contacts: () => state => state.app.contacts,
  chats: () => state => state.app.chats
}

export const getIsLoadingSidebar = () => (state: RootState): boolean => state.app.isLoading
