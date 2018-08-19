export const STATUS_NOT_STARTED = 'STATUS_NOT_STARTED'
export const STATUS_INITIALISING = 'STATUS_INITIALISING'
export const STATUS_INITIALISED = 'STATUS_INITIALISED'

export interface IDataState {
  status: string
  currentSearchresults?: any
  pubsInCrawl?: any
  currentLocation?: any
  friendsLocatioons?: any
  selectedPub?: any
  crawlRoute?: any
}

const DEFAULT_STATE: IDataState = {
  currentSearchresults: [],
  pubsInCrawl: [],
  status: STATUS_NOT_STARTED

}

export default DEFAULT_STATE
