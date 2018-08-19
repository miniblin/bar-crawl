import { addPubToCrawl, setCrawlRoute, setCurrentlySelectedPub } from 'app/state/action-creators/data'
import { IState } from 'app/state/reducers/_interfaces'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import PubDetails, { IProps as IPubDetailsProps } from './pub-details'

export default connect(mapStateToProps, mapDispatchToProps)(PubDetails)

interface IProps {
  className?: string
}

function mapStateToProps (state: IState, ownProps: IProps): IPubDetailsProps {

  return {
    isPubInCrawl: isPubInCrawl(state.data.selectedPub, state.data.pubsInCrawl),
    pubsInCrawl: state.data.pubsInCrawl,
    selectedPub: state.data.selectedPub
  }
}

function mapDispatchToProps (dispatch: Dispatch<Action>) {
  return {
    addPubToCrawl: (pub: any) => dispatch(addPubToCrawl(pub)),
    setCrawlRoute: (route: any) => dispatch(setCrawlRoute(route)),
    setCurrentlySelectedPub: () => dispatch(setCurrentlySelectedPub(undefined))
  }
}

const isPubInCrawl = (selectedPub: google.maps.places.PlaceResult, pubsInCrawl: google.maps.places.PlaceResult[]) => {
  if (selectedPub) {
    return (pubsInCrawl.findIndex((pub) => pub.id === selectedPub.id) >= 0)
  } else {
    return false
  }
}
