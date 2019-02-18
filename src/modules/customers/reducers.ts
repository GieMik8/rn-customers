import { persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { combineReducers } from 'redux'
import { getType, StateType } from 'typesafe-actions'
import { normalize } from 'normalizr'

import { CustomersAction } from '@/store/index'
import { Customer } from '@/types'
import * as actions from './actions'
import { customerSchema } from './schemas'

const plainCustomers: Customer[] = [
  {
    id: '1',
    name: 'Ieva',
    surname: 'Šeikytė',
    email: 'ieva.seikyte@gmail.com',
  },
  {
    id: '2',
    name: 'Giedrius',
    surname: 'Mikoliunas',
    email: 'giemik8@gmail.com',
  },
]

type CustomerMap = {
  [id: string]: Customer
}

type DataState = {
  result: string[]
  entities: {
    customers: CustomerMap
  }
}

const dataState: DataState = normalize(plainCustomers, customerSchema)

const data = (
  state: DataState = dataState,
  action: CustomersAction
): DataState => {
  switch (action.type) {
    case getType(actions.ready):
      return dataState
    case getType(actions.example):
      return dataState
    default:
      return dataState
  }
}

type UiState = {
  loading: boolean
}

const uiState = {
  loading: false,
}

const ui = (state: UiState = uiState, action: CustomersAction) => {
  switch (action.type) {
    case getType(actions.ready):
      return state
    default:
      return state
  }
}

const customersReducer = combineReducers({ data, ui })

const persistConfig = {
  key: 'customers',
  version: 1,
  storage: AsyncStorage,
}

export type CustomersState = StateType<typeof customersReducer>

export default persistReducer(persistConfig, customersReducer)
