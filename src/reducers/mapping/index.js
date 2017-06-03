import {GET_COLLECTIONS_OPTIMISTIC, GET_COLLECTIONS_SUCCESS} from './getCollections'
import {GET_MAPPING_OPTIMISTIC, GET_MAPPING_SUCCESS} from './getMapping'
import {SAVE_ENTITY_SUCCESS} from '../editor/saveEntity'
import {UPDATE_ENTITY_SUCCESS} from '../editor/updateEntity'
import {DELETE_ENTITY_SUCCESS} from '../editor/deleteEntity'

import {SAVE_RELATIONSHIP_SUCCESS} from '../editor/saveRelationship'
import {DELETE_RELATIONSHIP_SUCCESS} from '../editor/deleteRelationship'

export const SELECT_COLLECTION = 'SELECT_COLLECTION'

export function selectCollection(collection) {
  return {type: SELECT_COLLECTION, collection}
}

const defaultState = {
}
export default function mappingReducer(state = defaultState, action) {
  switch(action.type) {
    case GET_COLLECTIONS_SUCCESS:
      return _.assign({}, state, {
        collections: action.collections,
      })

    case SELECT_COLLECTION:
      return _.assign({}, state, {
        currentCollection: action.collection,
        map: null
      })

    case GET_MAPPING_OPTIMISTIC:
      return _.assign({}, state, {
        isGetMappingInProgress: true
      })

    case GET_MAPPING_SUCCESS:
      return _.assign({}, state, {
        isGetMappingInProgress: false,
        map: action.map
      })

    case SAVE_ENTITY_SUCCESS:
      return _.assign({}, state, {
        map: _.assign({}, state.map, {
          entities: _.concat(state.map.entities, action.entity)
        })
      })

    case UPDATE_ENTITY_SUCCESS:
      return _.assign({}, state, {
        map: _.assign({}, state.map, {
          entities: _.map(state.map.entities, e => {
            if (e.id === action.entity.id) {
              return action.entity
            }

            return e
          })
        })
      })

    case DELETE_ENTITY_SUCCESS:
      return _.assign({}, state, {
        map: _.assign({}, state.map, {
          entities: _.reject(state.map.entities, {id: action.entity.id})
        })
      })

    case SAVE_RELATIONSHIP_SUCCESS:
      return _.assign({}, state, {
        map: _.assign({}, state.map, {
          relationships: _.concat(state.map.relationships, action.relationship)
        })
      })

    case DELETE_RELATIONSHIP_SUCCESS:
      return _.assign({}, state, {
        map: _.assign({}, state.map, {
          relationships: _.reject(state.map.relationships, {id: action.relationship.id})
        })
      })

    default:
      return state
  }
}

export const HAS_PARENT_OF = 'HAS_PARENT_OF'
export const HAS_PREREQUISITE_OF = 'HAS_PREREQUISITE_OF'
