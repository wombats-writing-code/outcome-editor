import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'
import {login} from '../../reducers/login/login'

import Login from './Login'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in home container', state)

  return {
    isLoggedIn: state.login.isLoggedIn,
    isLoginInProgress: state.login.isLoginInProgress,
    loginMessage: state.login.loginMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (username, password) => dispatch(login(username, password)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
