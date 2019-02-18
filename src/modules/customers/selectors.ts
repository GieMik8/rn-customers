import { RootState } from '@/store'

export const getCustomers = (state: RootState) => {
  const { result, entities } = state.customers.data
  return result.map(id => entities.customers[id])
}
