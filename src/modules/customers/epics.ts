import { RootEpic } from '@/store'
import { combineEpics } from 'redux-observable'
// import { isActionOf } from 'typesafe-actions'
import { empty } from 'rxjs'
import { switchMap } from 'rxjs/operators'

export const fetchCustomers: RootEpic = action$ =>
  action$.pipe(switchMap(() => empty()))

export default combineEpics(fetchCustomers)
