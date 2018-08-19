import { IState } from 'app/state/reducers/_interfaces'
import { connect } from 'react-redux'
import { Action, Dispatch } from 'redux'

import Map, { IProps as IMapProps } from './crawl-details'

export default connect(mapStateToProps, mapDispatchToProps)(Map)

interface IProps {
  className?: string
}

function mapStateToProps (state: IState, ownProps: IProps): IMapProps {

  return{
    crawlRoute: state.data.crawlRoute,
    pubsInCrawl: state.data.pubsInCrawl
  }
}

function mapDispatchToProps (dispatch: Dispatch<Action>) {
  return {

  }
}
