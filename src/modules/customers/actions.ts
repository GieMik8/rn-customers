import { createStandardAction } from 'typesafe-actions'

import { Customer } from '@/types'

export const create = createStandardAction('customers/CREATE')<Customer>()
export const edit = createStandardAction('customers/EDIT')<Customer>()
export const initDeleteCustomer = createStandardAction(
  'customer/INIT_DELETE_CUSTOMER'
)<string>()
export const deleteCustomer = createStandardAction('customer/DELETE')<string>()
export const setGridMode = createStandardAction('customers/SET_GRID_MODE')<
  boolean
>()
