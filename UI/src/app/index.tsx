import * as React from 'react'
import { Provider } from 'react-redux'

import App from './app'
import store from './state/store'

export default function AppWiring () {
  return (
    <Provider store={store}>
      <App />
    </Provider >
  )
}
