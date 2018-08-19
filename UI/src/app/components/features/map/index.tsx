import { setCurrentLocation, setCurrentlySelectedPub, setCurrentResults } from 'app/state/action-creators/data'
import { IState } from 'app/state/reducers/_interfaces'
import { IAction } from 'app/state/store/_interfaces'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'
import Map, { IProps as IMapProps } from './map'

export default connect(mapStateToProps, mapDispatchToProps)(Map)

interface IProps {
  className?: string
}

function mapStateToProps (state: IState, ownProps: IProps): IMapProps {

  return{
    crawlRoute: state.data.crawlRoute,
    currentLocation: state.data.currentLocation,
    currentResults: state.data.currentSearchresults,
    pubsInCrawl: state.data.pubsInCrawl
  }
}

function mapDispatchToProps (dispatch: Dispatch<Action>) {
  return {
    addPubToCrawl: (pub: any) => null,
    setCurrentLocation: (location: any) => dispatch(setCurrentLocation(location)),
    setCurrentSearchResults: (results: any) => dispatch(setCurrentResults(results)),
    setCurrentlySelectedPub: (results: any) => dispatch(setCurrentlySelectedPub(results))
  }
}
