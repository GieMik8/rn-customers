import { persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import { combineReducers } from 'redux'
import { getType, StateType } from 'typesafe-actions'
import { normalize, denormalize } from 'normalizr'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { CustomersAction } from '@/store/index'
import { Customer } from '@/types'
import * as actions from './actions'
import { customerSchema } from './schemas'

const plainCustomers: Customer[] = [
  // new Customer(Utils.genId(), 'Nick', 'Nickname', 'nick@gmail.com'),
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

const getCustomers = ({ result, entities }: DataState): Customer[] =>
  denormalize(result, customerSchema, entities)

const data = (
  state: DataState = dataState,
  action: CustomersAction
): DataState => {
  switch (action.type) {
    case getType(actions.create): {
      const customers = getCustomers(state)
      customers.push(action.payload)
      return normalize(customers, customerSchema)
    }
    case getType(actions.deleteCustomer): {
      let customers = getCustomers(state)
      customers = customers.filter(c => c.id !== action.payload)
      return normalize(customers, customerSchema)
    }
    case getType(actions.edit): {
      const customers = getCustomers(state)
      const index = customers.findIndex(c => c.id === action.payload.id)
      customers[index] = action.payload
      return normalize(customers, customerSchema)
    }
    default:
      return state
  }
}

type UiState = {
  loading: boolean
  gridMode: boolean
}

const uiState = {
  loading: false,
  gridMode: false,
}

const ui = (state: UiState = uiState, action: CustomersAction) => {
  switch (action.type) {
    case getType(actions.setGridMode):
      return { ...state, gridMode: action.payload }
    default:
      return state
  }
}

const customersReducer = combineReducers({ data, ui })

const persistConfig = {
  key: 'customers',
  version: 1,
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['data', 'ui'],
}

export type CustomersState = StateType<typeof customersReducer>

export default persistReducer(persistConfig, customersReducer)
