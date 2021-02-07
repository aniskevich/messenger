import './styles/index.scss'

import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'

import {App} from './app/App'
import {store} from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.getElementById('app'))
