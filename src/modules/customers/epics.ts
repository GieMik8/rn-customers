import { RootEpic } from '@/store'
import { combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of, timer } from 'rxjs'
import { filter, switchMap, tap } from 'rxjs/operators'

import * as actions from './actions'

export const fetchCustomers: RootEpic = (action$, state$) =>
  action$.pipe(
    filter(isActionOf(actions.fetchCustomers.request)),
    tap(action => console.log('customers', state$, action.payload)),
    switchMap(() =>
      timer(3000).pipe(
        switchMap(() => of(actions.fetchCustomers.success('as')))
      )
    )
  )

export default combineEpics(fetchCustomers)
