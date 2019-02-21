import { createStandardAction, createAsyncAction } from 'typesafe-actions'

import { Customer } from '@/types'

export const ready = createStandardAction('customers/READY')<string>()
export const example = createStandardAction('customers/EXAMPLE')<string>()

export const fetchCustomers = createAsyncAction(
  'customers/FETCH',
  'customers/FETCH_SUCCESS',
  'customers/FETCH_FAILURE'
)<string, string, Error>()

export const create = createStandardAction('customers/CREATE')<Customer>()
export const edit = createStandardAction('customers/EDIT')<Customer>()
