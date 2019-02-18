import { RootAction, RootState } from '@/store'
import { Epic, combineEpics } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { of, timer } from 'rxjs'
import { filter, switchMap, tap } from 'rxjs/operators'

import * as actions from './actions'

export const fetchCustomers: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isActionOf(actions.fetchCustomers.request)),
    tap(action => console.log('customers', state$, action.payload)),
    switchMap(() =>
      timer(3000).pipe(
        tap(mhm => console.log({ mhm })),
        switchMap(() => of(actions.fetchCustomers.success('as')))
      )
    )
  )

export default combineEpics(fetchCustomers)
