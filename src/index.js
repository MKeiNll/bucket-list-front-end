import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import App from './components/App'
import { fetchEntries } from './actions'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

let entries = store.dispatch(fetchEntries())

render(
  <Provider store={store}>
    <App fetchedEntries={entries} />
  </Provider>,
  document.getElementById('root')
)