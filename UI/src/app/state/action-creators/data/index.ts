import {
  ACKNOWLEDGE_APP_INITIALISED,
  ADD_PUB_TO_CRAWL, INITIALISE_APP,
  SET_CRAWL_ROUTE,
  SET_CURRENT_LOCATION,
  SET_CURRENT_RESULTS,
  SET_CURRENTLY_SELECTED_PUB
} from 'app/state/action-types'
import { IAction } from 'app/state/store/_interfaces'

export function initialiseApp (): IAction {
  return {
    type: INITIALISE_APP
  }
}

export function acknowledgeAppInitialised (): IAction {
  return {
    type: ACKNOWLEDGE_APP_INITIALISED
  }
}

export interface ISetCurrentLocationPayload {
  lat: string,
  long: string
}
export function setCurrentLocation (payload: ISetCurrentLocationPayload): IAction<ISetCurrentLocationPayload> {
  return {
    payload,
    type: SET_CURRENT_LOCATION
  }
}

export function setCurrentResults (payload: any): IAction<any> {
  return {
    payload,
    type: SET_CURRENT_RESULTS
  }
}

export function setCurrentlySelectedPub (payload: any): IAction<any> {
  return {
    payload,
    type: SET_CURRENTLY_SELECTED_PUB
  }
}

export function addPubToCrawl (payload: any): IAction<any> {
  return {
    payload,
    type: ADD_PUB_TO_CRAWL
  }
}

export function setCrawlRoute (payload: any): IAction<any> {
  return {
    payload,
    type: SET_CRAWL_ROUTE
  }
}
