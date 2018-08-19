import rootReducer from 'app/state/reducers'
import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic } from '../middleware/epics'
declare var window: { readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any; }

const composeEnhancers =
  (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const epicMiddleware = createEpicMiddleware()

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(      
      epicMiddleware
    ),
  )
)
epicMiddleware.run(rootEpic)

export default store
