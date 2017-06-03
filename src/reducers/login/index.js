
import {LOGIN_OPTIMISTIC, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT} from './login'

const defaultState = {
  isLoggedIn: false,
  user: null
}

export default function loginReducer(state = defaultState, action) {
  switch(action.type) {
    case LOGIN_OPTIMISTIC:
      return _.assign({}, state, {
        isLoginInProgress: true,
        loginMessage: null
      })

    case LOGIN_SUCCESS:
      return _.assign({}, state, {
        isLoginInProgress: false,
        user: action.data,
        isLoggedIn: true,
        loginMessage: null
      })

    case LOGIN_FAIL:
      return _.assign({}, state, {
        isLoginInProgress: false,
        isLoggedIn: false,
        loginMessage: 'Wrong email/password'
      })

    case LOGOUT:
      return _.assign({}, state, {
        isLoggedIn: false,
        user: null
      })

    default:
      return state
  }
}
