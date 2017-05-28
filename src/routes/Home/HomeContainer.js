import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'

import {selectCollection} from '../../reducers/mapping/'
import {getMapping} from '../../reducers/mapping/getMapping'
import {selectEntityType} from '../../reducers/editor/selectEntity'

import Home from './Home'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in home container', state)

  return {
    collections: state.login.collections,
    currentCollection: state.mapping.currentCollection,
    map: state.mapping.map,
    editingEntityType: state.editor.editingEntityType,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectCollection: (collection) => {
      dispatch(selectCollection(collection))
      dispatch(getMapping(collection, {
        entityTypes: collection.hierarchy,
        relationshipTypes: collection.relationshipTypes
      }))
    },
    onSelectEntityType: name => dispatch(selectEntityType(name))
  }
}

const entitiesSelector = state => state.mapping.map ? state.mapping.map.entities : null

export default connect(mapStateToProps, mapDispatchToProps)(Home)
