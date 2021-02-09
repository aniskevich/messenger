import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {authReducer} from './reducers/authReducer'
import {appReducer} from './reducers/appReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))