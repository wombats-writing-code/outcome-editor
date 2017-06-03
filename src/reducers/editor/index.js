
import {SELECT_COLLECTION} from '../mapping/'

import {SELECT_ENTITY, SELECT_ENTITY_TYPE} from './selectEntity'
import { SELECT_NEW_ENTITY, CLOSE_NEW_ENTITY } from './selectNewEntity'
import { SELECT_EDIT_ENTITY, CLOSE_EDIT_ENTITY } from './selectEditEntity'
import {CHANGE_EDIT_ENTITY} from './changeEditEntity'
import {SAVE_ENTITY_OPTIMISTIC, SAVE_ENTITY_SUCCESS} from './saveEntity'
import {UPDATE_ENTITY_OPTIMISTIC, UPDATE_ENTITY_SUCCESS} from './updateEntity'
import {DELETE_ENTITY_OPTIMISTIC, DELETE_ENTITY_SUCCESS} from './deleteEntity'

import {SELECT_ADD_RELATIONSHIP, SELECT_RELATIONSHIP_TARGET, CLOSE_ADD_RELATIONSHIP} from './selectAddRelationship'
import {SAVE_RELATIONSHIP_OPTIMISTIC, SAVE_RELATIONSHIP_SUCCESS} from './saveRelationship'
import {DELETE_RELATIONSHIP_OPTIMISTIC, DELETE_RELATIONSHIP_SUCCESS} from './deleteRelationship'

import {HAS_PARENT_OF, HAS_PREREQUISITE_OF} from '../mapping'

export const invisibleProperties = ['type', 'learningObjectiveId', 'domain', 'auditTrail']
export const uneditableProperties = ['type', 'learningObjectiveId', 'domain', 'id', 'auditTrail']


const defaultState = {

}
export default function editorReducer(state = defaultState, action) {
  switch(action.type) {
    case SELECT_COLLECTION:
      return _.assign({}, state, {
        currentEntity: null,
        editingEntityType: null
      })

    case SELECT_ENTITY_TYPE:
      return _.assign({}, state, {
        editingEntityType: action.entityType,
        currentEntity: null
      })

    case SELECT_ENTITY:
      return _.assign({}, state, {
        currentEntity: action.entity,
      })

    // ---- creating a new entity ----
    case SELECT_NEW_ENTITY:
      return _.assign({}, state, {
        isNewEntityInProgress: true,
        currentEntityCopy: stampNewEntity({type: action.entityType, domain: action.domain})
      })

    case SAVE_ENTITY_OPTIMISTIC:
      return _.assign({}, state, {
        isSaveEntityInProgress: true
      })

    case SAVE_ENTITY_SUCCESS:
      return _.assign({}, state, {
        isSaveEntityInProgress: false,
        isNewEntityInProgress: false,
        currentEntity: action.entity
      })

    case CLOSE_NEW_ENTITY:
      return _.assign({}, state, {
        isNewEntityInProgress: false,
        currentEntityCopy: null
      })

    // ---- updating an entity ----
    case SELECT_EDIT_ENTITY:
      return _.assign({}, state, {
        currentEntityCopy: _.cloneDeep(action.entity),
        isEditEntityInProgress: true
      })

    case UPDATE_ENTITY_OPTIMISTIC:
      return _.assign({}, state, {
        isUpdateEntityInProgress: true
      })

    case UPDATE_ENTITY_SUCCESS:
      return _.assign({}, state, {
        isUpdateEntityInProgress: false,
        isEditEntityInProgress: false,
        currentEntity: action.entity
      })

    case CLOSE_EDIT_ENTITY:
      return _.assign({}, state, {
        currentEntityCopy: null,
        isEditEntityInProgress: false
      })

    case CHANGE_EDIT_ENTITY:
      return _.assign({}, state, {
        currentEntityCopy: _.assign({}, state.currentEntityCopy, action.data)
      })


    // ---- deleting an entity ----
    case DELETE_ENTITY_OPTIMISTIC:
      return _.assign({}, state, {
        isDeleteEntityInProgress: true
      })

    case DELETE_ENTITY_SUCCESS:
      return _.assign({}, state, {
        isDeleteEntityInProgress: false,
        currentEntity: null
      })

    // ------------
    // editing links
    // ------------
    case SELECT_ADD_RELATIONSHIP:
      return _.assign({}, state, {
        isAddRelationshipInProgress: true,
        currentRelationshipCopy: stampNewRelationship(action.data),
      })

    case SELECT_RELATIONSHIP_TARGET:
      return _.assign({}, state, {
        currentRelationshipCopy: _.assign({}, state.currentRelationshipCopy, {
          targetId: action.entityId
        })
      })

    case SELECT_RELATIONSHIP_TARGET:
      return _.assign({}, state, {
        currentRelationshipCopy: _.assign({}, state.currentRelationshipCopy, {
          sourceId: action.entityId
        })
      })

    case SAVE_RELATIONSHIP_OPTIMISTIC:
      return _.assign({}, state, {
        isSaveRelationshipInProgress: true
      })

    case SAVE_RELATIONSHIP_SUCCESS:
      return _.assign({}, state, {
        isAddRelationshipInProgress: false,
        isSaveRelationshipInProgress: false,
        currentRelationshipCopy: null
      })

    case CLOSE_ADD_RELATIONSHIP:
      return _.assign({}, state, {
        isAddRelationshipInProgress: false,
        currentRelationshipCopy: null,
      })

    case DELETE_RELATIONSHIP_OPTIMISTIC:
      return _.assign({}, state, {
        isDeleteRelationshipInProgress: true,
      })

    case DELETE_RELATIONSHIP_SUCCESS:
      return _.assign({}, state, {
        isDeleteRelationshipInProgress: false,
      })

    default:
      return state
  }
}

function stampNewRelationship(data) {
  return {
    domain: data.domain,
    sourceId: data.source ? data.source.id : null,
    targetId: data.target ? data.target.id : null,
    directionality: getDirectionality(data.type),
    type: data.type
  }
}

function stampNewEntity(data) {
  return _.assign({}, data, {
    displayName: `new ${_.lowerCase(data.type)}`,
    description: '',
    type: data.type,
  })
}

function getDirectionality(type) {
  if (type === 'IS_RELATED_TO') {
    return 'UNDIRECTED'
  }

  return 'DIRECTED'
}
