import '@blueprintjs/core/lib/css/blueprint.css'

import App from 'app'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './_styles/main.css'

const rootElement = document.getElementById('app')

renderRoot(App)

if ((module as any).hot) {
  (module as any).hot.accept('app', () => {
    const NextApp = require('app').default
    renderRoot(NextApp)
  })
}

function renderRoot (Component: typeof App) {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    rootElement
  )
}
