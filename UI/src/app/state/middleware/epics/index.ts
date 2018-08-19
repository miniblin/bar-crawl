import { Action } from 'redux'
import { combineEpics, StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { AjaxResponse } from 'rxjs/ajax'
import { filter, map, switchMap } from 'rxjs/Operators'
import { get, setBaseUrl } from 'services/ajax'

import { acknowledgeAppInitialised } from '../../action-creators/data'
import { INITIALISE_APP } from '../../action-types'

const InitializeEpic = (action$: Observable<Action>, state: StateObservable<any>) => action$.pipe(
    filter((action) => action.type === INITIALISE_APP),
    switchMap((action) => get({ endpoint: 'app-config.json' })),
    map((payload: AjaxResponse) => {
      setBaseUrl(payload.response.serviceUrlBase)
      return acknowledgeAppInitialised()
    })
)

export const rootEpic = combineEpics(
    InitializeEpic
)
