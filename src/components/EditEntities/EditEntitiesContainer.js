import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'

import {selectEntity} from '../../reducers/editor/selectEntity'
import {selectNewEntity} from '../../reducers/editor/selectNewEntity'
import {selectEditEntity} from '../../reducers/editor/selectEditEntity'
import {selectEditLink} from '../../reducers/editor/selectEditLink'
import {deleteEntity} from '../../reducers/editor/deleteEntity'
import {parentTypeSelector} from '../../selectors/'

import EditEntities from './EditEntities'


const mapStateToProps = (state, ownProps) => {
  console.log('state in EditEntities container', state)

  return {
    collection: state.mapping.currentCollection,
    map: state.mapping.map,
    currentEntity: state.editor.currentEntity,
    entities: _.filter(entitiesSelector(state), {type: state.editor.editingEntityType}),
    currentEntity: state.editor.currentEntity,
    editingEntityType: state.editor.editingEntityType,
    editingEntityTypeParent: parentTypeSelector(state),
    relationshipTypes: relationshipTypesSelector(state),
    visualizedEntities: visualizeEntitiesSelector(state),
    isEditLinkInProgress: state.editor.isEditLinkInProgress,
    isEditEntityInProgress: state.editor.isEditEntityInProgress,
    isNewEntityInProgress: state.editor.isNewEntityInProgress,
    isDeleteEntityInProgress: state.editor.isDeleteEntityInProgress
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectEntity: (entity) => dispatch(selectEntity(entity)),
    onClickNewEntity: (entityType, domain) => dispatch(selectNewEntity(entityType, domain)),
    onClickEditEntity: (entity) => dispatch(selectEditEntity(entity)),
    onClickEditLink: (data) => dispatch(selectEditLink(data)),
    onDeleteEntity: entity => dispatch(deleteEntity(entity))
  }
}

const visualizeEntitiesSelector = createSelector([
  state => state.mapping.map,
  state => state.editor.currentEntity
], (mapping, currentEntity) => {

  if (!currentEntity) return;

  let entity = _.find(mapping.entities, {id: currentEntity.id});
  let entities;
  // if the entity is an outcome, get ALL of its prerequisites
  if (entity && entity.type === 'OUTCOME') {
    let rels = _.filter(mapping.relationships, {sourceId: entity.id, type: 'HAS_PREREQUISITE_OF'});
    let prereqs = _.map(rels, r => _.find(mapping.entities, {id: r.targetId}));

    entities = _.concat(entity, prereqs);

  } else {
    // if the entity is a module, get the children
    let rels = _.filter(mapping.relationships, {targetId: currentEntity.id, type: 'HAS_PARENT_OF'});
    let children = _.map(rels, r => _.find(mapping.entities, {id: r.sourceId}));

    // console.log('module children', children, rels)


    entities = children;
  }

  entities = _.compact(entities)


  return entities;
})

const relationshipSelector = state => state.mapping ? state.mapping.currentCollection.relationship : null

const relationshipTypesSelector = state => state.mapping ? state.mapping.currentCollection.relationshipTypes : null

const entitiesSelector = state => state.mapping.map ? state.mapping.map.entities : null

export default connect(mapStateToProps, mapDispatchToProps)(EditEntities)
