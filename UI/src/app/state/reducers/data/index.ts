import { IAction } from 'app/state/store/_interfaces'

import {
  ACKNOWLEDGE_APP_INITIALISED,
  ADD_PUB_TO_CRAWL, INITIALISE_APP,
  SET_CRAWL_ROUTE,
  SET_CURRENT_LOCATION,
  SET_CURRENT_RESULTS,
  SET_CURRENTLY_SELECTED_PUB
} from '../../action-types'
import DEFAULT_STATE, { IDataState, STATUS_INITIALISED, STATUS_INITIALISING } from './default-state'

export default function statusInformationReducer (
  currentState: IDataState = DEFAULT_STATE,
  action: IAction
) {
  const { payload } = action
  switch (action.type) {
    case INITIALISE_APP: return setStatus(currentState, STATUS_INITIALISING)
    case ACKNOWLEDGE_APP_INITIALISED: return setStatus(currentState, STATUS_INITIALISED)
    case SET_CURRENT_LOCATION: return setCurrentLocation(currentState, payload)
    case SET_CURRENT_RESULTS: return setCurrentResults(currentState, payload)
    case SET_CURRENTLY_SELECTED_PUB: return setSelectedPub(currentState, payload)
    case ADD_PUB_TO_CRAWL: return addPubToCrawl(currentState, payload)
    case SET_CRAWL_ROUTE: return setCrawlRoute(currentState, payload)
    default: return currentState
  }
}

function setStatus (currentState: IDataState, status: string): IDataState {
  return {
    ...currentState,
    status
  }
}

function setCurrentLocation (currentState: IDataState, location: any): IDataState {
  return {
    ...currentState,
    currentLocation: location
  }
}

function setCurrentResults (currentState: IDataState, results: any): IDataState {
  return {
    ...currentState,
    currentSearchresults: results
  }
}

function setSelectedPub (currentState: IDataState, pub: any): IDataState {
  return {
    ...currentState,
    selectedPub: pub
  }
}

function setCrawlRoute (currentState: IDataState, route: any): IDataState {
  return {
    ...currentState,
    crawlRoute: route
  }
}

function addPubToCrawl (currentState: IDataState, pub: any): IDataState {
  return {
    ...currentState,
    pubsInCrawl: [
      ...currentState.pubsInCrawl,
      pub
    ]
  }
}
