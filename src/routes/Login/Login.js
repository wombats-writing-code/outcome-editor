import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Header from '../../components/Header'
import EditEntities from '../../components/EditEntities'
import {PUBLIC_PATH} from '../../utilities'

import './Login.scss'


class Login extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      return browserHistory.push(`${PUBLIC_PATH}`)
    }
  }

  render() {
    let props = this.props;

    let loginButtonText = props.isLoginInProgress ? 'Working...' : 'Login'
    let loginMessage = props.loginMessage;


    return (
      <div className="login">
        <div>
          <div className="login__wrapper ">
            <img className="login__footer-logo" src={require('./assets/graph-editor-logo.png')} alt="Graph Editor" />
            <h1 className="login__title">Graph Editor</h1>
            <input className="login__input username" type="text" placeholder="Username"
                  value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
            <input className="login__input password" type="password" placeholder="Password"
                    value={this.state.password} onChange={e => this.setState({password: e.target.value})}
            />

            <button className="button login__button" 
                    disabled={!this.state.username || !this.state.password || props.isLoginInProgress}
                    onClick={() => props.onLogin(this.state.username, this.state.password)}>
              {loginButtonText}
            </button>

            <p className="login__error-message">{props.loginMessage}</p>
          </div>

          <div className="login__footer clearfix">
            <a href="https://mapping.mit.edu" target="_blank"><img className="login__footer-logo" src={require('./assets/mapping-lab-logo.png')} alt="MIT Mapping Lab" /></a>
            <p className="login__footer-text">An ed tech app from the <a className="login__link" href="https://mapping.mit.edu" target="_blank">MIT Mapping Lab</a></p>
          </div>
        </div>
      </div>
    )
  }

}

export default Login
