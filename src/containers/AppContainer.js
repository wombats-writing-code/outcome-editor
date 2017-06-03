import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

import {PUBLIC_PATH} from '../utilities'

import '../styles/foundation.css'
import '../styles/core.scss'

class AppContainer extends Component {
  static propTypes = {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount() {
    let store = this.props.store;
    let state = store.getState();
    if (!state.login.isLoggedIn) {
      browserHistory.push(`${PUBLIC_PATH}/login`)
    }

    store.subscribe(() => {
      let newState = store.getState();
      if (!newState.login.isLoggedIn) {
        window.location.reload()
      }
    })
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={browserHistory} children={routes} store={store} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
