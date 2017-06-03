import { injectReducer } from '../../store/reducers'
import {PUBLIC_PATH} from '../../utilities'

export default (store) => ({
  path : `${PUBLIC_PATH}/login`,
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */

      /*  Return getComponent   */
      const Login = require('./LoginContainer').default

      cb(null, Login)

    /* Webpack named bundle   */
    }, 'login')
  }
})
