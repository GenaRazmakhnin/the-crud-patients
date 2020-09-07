import React from 'react'
import ReactDOM from 'react-dom'
import RootComponent from './App'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { reducer as rootReducer, saga as rootSaga } from './store'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

ReactDOM.render(
    <Provider store={store}>
      <RootComponent />
    </Provider>,
  document.getElementById('root')
)
