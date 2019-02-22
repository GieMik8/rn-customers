import { createStandardAction, createAsyncAction } from 'typesafe-actions'

import { Customer } from '@/types'

export const create = createStandardAction('customers/CREATE')<Customer>()
export const edit = createStandardAction('customers/EDIT')<Customer>()
export const deleteCustomer = createStandardAction('customer/DELETE')<string>()
