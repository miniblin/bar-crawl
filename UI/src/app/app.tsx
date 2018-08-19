import './app.css'

import { initialiseApp } from 'app/state/action-creators/data'
import * as React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom'
import Map from './components/pages/bar-crawl'
import MainMenu from './components/pages/main-menu'
import { IState } from './state/reducers/_interfaces'
import { STATUS_INITIALISED } from './state/reducers/data/default-state'
import store from './state/store'

interface IProps {
  isAppInitialised: boolean
}

class App extends React.Component<IProps, {}> {
  public componentWillMount() {
    store.dispatch(initialiseApp())
  }

  public render() {
    const { isAppInitialised } = this.props
    return (
      <section className='app'>       
        {isAppInitialised ? this.renderApp() : this.renderSplashScreen()}
      </section>
    )
  }

  public renderSplashScreen = ()=><div/>

  public renderApp = () => {
    const mainMenu = () => <MainMenu />
    return (
      <section className='app'>
        <Router>
          <div className={'app__content'}>
            <Switch>
              <Route path='/bar-crawl' render={mainMenu} />
              <Route path='/bar-crawl-map' render={Map} />
              <Redirect from='/' to='/bar-crawl' />
            </Switch>
          </div>
        </Router>
      </section >
    )
  }

}

function mapStateToProps(state: IState) {
  const { status } = state.data
  return {
    isAppInitialised: status === STATUS_INITIALISED
  }
}
export default connect(mapStateToProps)(App)
