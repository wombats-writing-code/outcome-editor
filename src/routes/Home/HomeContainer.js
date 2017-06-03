import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'

import {getCollections} from '../../reducers/mapping/getCollections'
import {selectCollection} from '../../reducers/mapping/'
import {getMapping} from '../../reducers/mapping/getMapping'
import {selectEntityType} from '../../reducers/editor/selectEntity'
import {logout} from '../../reducers/login/login'

import Home from './Home'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in home container', state)

  return {
    user: state.login.user,
    collections: state.mapping.collections,
    currentCollection: state.mapping.currentCollection,
    map: state.mapping.map,
    editingEntityType: state.editor.editingEntityType,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getCollections: (collectionIds) => dispatch(getCollections(collectionIds)),
    onSelectCollection: (collection) => {
      dispatch(selectCollection(collection))

      if (collection) {
        dispatch(getMapping(collection, {
          entityTypes: collection.hierarchy,
          relationshipTypes: collection.relationshipTypes
        }))
      }
    },
    onSelectEntityType: name => dispatch(selectEntityType(name)),
    onLogout: () => dispatch(logout())
  }
}

const entitiesSelector = state => state.mapping.map ? state.mapping.map.entities : null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
