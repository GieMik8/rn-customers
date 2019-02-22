import { Alert } from 'react-native'
import { combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { empty, from, of, throwError } from 'rxjs'
import { switchMap, filter, map, catchError } from 'rxjs/operators'

import { RootEpic } from '@/store'
import { deleteCustomer, initDeleteCustomer } from './actions'
import { getCustomerById } from './selectors'

const fetchCustomers: RootEpic = action$ =>
  action$.pipe(switchMap(() => empty()))

const deleteCustomerEpic: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(initDeleteCustomer)),
    switchMap(action =>
      of(action).pipe(
        map(action => getCustomerById(state$.value, action.payload)),
        switchMap(customer => {
          if (!customer) return throwError('Customer does not exist')
          return from(
            new Promise((resolve, reject) => {
              Alert.alert(
                'Are you sure?',
                `Deleting ${customer.name} ${customer.surname}..`,
                [
                  { text: 'Yes', onPress: resolve },
                  { text: 'No', style: 'cancel', onPress: reject },
                ]
              )
            })
          ).pipe(
            switchMap(() => {
              return of(deleteCustomer(action.payload))
            }),
            catchError(empty)
          )
        }),
        catchError(err => {
          console.warn(err)
          return empty()
        })
      )
    )
  )

export default combineEpics(fetchCustomers, deleteCustomerEpic)
