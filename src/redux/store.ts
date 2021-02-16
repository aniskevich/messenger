import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {authReducer} from './reducers/authReducer'
import {appReducer} from './reducers/appReducer'
import {messageReducer} from './reducers/messageReducer'


const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  message: messageReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))