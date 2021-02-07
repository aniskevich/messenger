import { RootState } from './store'

export const getIsAuth = () => (state: RootState) => state.user.isAuth
export const getIsLoading = () => (state: RootState) => state.user.isLoading