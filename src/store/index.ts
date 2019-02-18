import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { ActionType, StateType } from 'typesafe-actions'

import customersReducer from '@/modules/customers/reducers'
import customersEpics from '@/modules/customers/epics'
import * as customersActions from '@/modules/customers/actions'

export type CustomersAction = ActionType<typeof customersActions>

const rootActions = {
  customers: customersActions,
}

/**
 * Combined reducers & epics
 * @see {@link https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html}
 */
const rootEpic = combineEpics(customersEpics)
const rootReducer = combineReducers({
  customers: customersReducer,
})

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
  dependencies: {},
})

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
  }
}

const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const pReducer = persistReducer(persistConfig, rootReducer)

function configureStore() {
  const store = createStore(
    pReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  )

  return store
}

export const store = configureStore()

epicMiddleware.run(rootEpic)

export type RootAction = ActionType<typeof rootActions>
export type RootState = StateType<typeof rootReducer>

export const persistor = persistStore(store, {}, () => {
  store.dispatch({ type: 'REHYDRATED' })
})
