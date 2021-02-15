import { RootState } from './store'
import {EntityType} from '../api/chatAPI'
import {UserType} from '../api/api'

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

export const getCurrentUser = () => (state: RootState): UserType => state.auth.currentUser

export const getIsProfileVisible = () => (state: RootState): boolean => state.app.isProfileVisible

export const getActiveChatId = () => (state: RootState): string => state.app.activeChatId

export const getChat = () => (state: RootState): EntityType => state.app.chats.filter(chat => chat._id === state.app.activeChatId)[0]
