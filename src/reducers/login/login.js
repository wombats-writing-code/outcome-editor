import axios from 'axios'
import {getDomain} from '../utilities'
import md5 from 'blueimp-md5'

export const LOGIN_OPTIMISTIC = 'LOGIN_OPTIMISTIC'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT = 'LOGOUT'

function loginOptimistic() {
  return {type: LOGIN_OPTIMISTIC}
}

function loginSuccess(data) {
  return {type: LOGIN_SUCCESS, data}
}

function loginFail(data) {
  return {type: LOGIN_FAIL, data}
}

export function logout() {
  return {type: LOGOUT}
}

export function login(username, password) {
  return function(dispatch) {

    return axios({
      url: `${getDomain()}/api/authenticate`,
      method: 'POST',
      data: {
        username,
        password: md5(password)
      }
    })
    .then( res => {
      let data = res.data;

      dispatch(loginSuccess(data));

      return data;
    })
    .catch( err => {
      console.error('error in login', err)

      return dispatch(loginFail(err))
    })

  }
}
