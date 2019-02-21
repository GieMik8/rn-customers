import { RootState } from '@/store'

export const getCustomers = (state: RootState) => {
  const { result, entities } = state.customers.data
  return result.map(id => entities.customers[id])
}

export const getCustomerById = (state: RootState, customerId: string) => {
  const customers = getCustomers(state)
  return customers.find(({ id }) => id === customerId)
}
