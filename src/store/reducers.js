import { combineReducers } from 'redux'
import locationReducer from './location'

import mappingReducer from '../reducers/mapping/'
import loginReducer from '../reducers/login/'
import editorReducer from '../reducers/editor/'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    mapping: mappingReducer,
    editor: editorReducer,
    login: loginReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
