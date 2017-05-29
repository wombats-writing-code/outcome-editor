
import {SELECT_ENTITY, SELECT_ENTITY_TYPE} from './selectEntity'
import { SELECT_NEW_ENTITY, CLOSE_NEW_ENTITY } from './selectNewEntity'
import {SAVE_ENTITY_OPTIMISTIC, SAVE_ENTITY_SUCCESS} from './saveEntity'
import {UPDATE_ENTITY_OPTIMISTIC, UPDATE_ENTITY_SUCCESS} from './updateEntity'
import {DELETE_ENTITY_OPTIMISTIC, DELETE_ENTITY_SUCCESS} from './deleteEntity'
import {
  SELECT_EDIT_ENTITY,
  CLOSE_EDIT_ENTITY
} from './selectEditEntity'
import {
  SELECT_EDIT_LINK, SELECT_LINK_TARGET,
  SAVE_EDIT_LINK_OPTIMISTIC, SAVE_EDIT_LINK_SUCCESS,
  CLOSE_EDIT_LINK
} from './selectEditLink'

import {CHANGE_EDIT_ENTITY} from './changeEditEntity'


export const invisibleProperties = ['type', 'learningObjectiveId', 'domain', 'auditTrail']
export const uneditableProperties = ['type', 'learningObjectiveId', 'domain', 'id', 'auditTrail']


const defaultState = {

}
export default function editorReducer(state = defaultState, action) {
  switch(action.type) {
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
    case SELECT_EDIT_LINK:
      return _.assign({}, state, {
        isEditLinkInProgress: true,
        currentSourceEntity: action.data.source,
        currentTargetEntity: action.data.target,
        currentRelationshipType: action.data.type
      })

    case SELECT_LINK_TARGET:
      return _.assign({}, state, {
        currentTargetEntity: action.entity
      })

    case SAVE_EDIT_LINK_OPTIMISTIC:
      return _.assign({}, state, {
        isSave: action.entity
      })

    case CLOSE_EDIT_LINK:
      return _.assign({}, state, {
        isEditLinkInProgress: false
      })

    default:
      return state
  }
}

function stampNewEntity(data) {
  return _.assign({}, data, {
    displayName: `new ${_.lowerCase(data.type)}`,
    description: '',
    type: data.type,
  })
}
