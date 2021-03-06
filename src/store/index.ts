import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { createEpicMiddleware, combineEpics, Epic } from 'redux-observable'
import { ActionType, StateType } from 'typesafe-actions'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'

import Utils from '@/utils'
import { Api } from '@/services'
import customersReducer from '@/modules/customers/reducers'
import customersEpics from '@/modules/customers/epics'
import * as customersActions from '@/modules/customers/actions'

const rootActions = {
  customers: customersActions,
}

export type Dependencies = {
  utils: typeof Utils
  api: typeof Api
}

/**
 * Combined reducers & epics
 * @see {@link https://redux-observable.js.org/docs/basics/SettingUpTheMiddleware.html}
 */
const rootEpic = combineEpics(customersEpics)
const rootReducer = combineReducers({
  customers: customersReducer,
})

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Dependencies
>({
  dependencies: { utils: Utils, api: Api },
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
  stateReconciler: autoMergeLevel2,
  whitelist: ['customers'],
  // https://github.com/rt2zz/redux-persist/issues/824 nested whitelist doesnt work without this
  // blacklist: ['customers'],
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

export type CustomersAction = ActionType<typeof customersActions>
export type RootAction = ActionType<typeof rootActions>
export type RootState = StateType<typeof rootReducer>
export type RootEpic = Epic<RootAction, RootAction, RootState, Dependencies>

export const persistor = persistStore(store, {}, () => {
  store.dispatch({ type: 'REHYDRATED' })
})
