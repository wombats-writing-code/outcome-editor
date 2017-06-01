import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'

import {closeAddRelationship, selectRelationshipTarget} from '../../reducers/editor/selectAddRelationship'
import {saveRelationship} from '../../reducers/editor/saveRelationship'
import {parentTypeSelector} from '../../selectors/'

import AddRelationship from './AddRelationship'


const mapStateToProps = (state, ownProps) => {
  // console.log('state.editor in AddRelationship container', state.editor)
  let relationship = state.editor.currentRelationshipCopy;

  return {
    collection: state.mapping.currentCollection,
    map: state.mapping.map,
    entities: validEntitiesSelector(state),
    relationship,
    source: relationship ? _.find(state.mapping.map.entities, {id: relationship.sourceId}) : null,
    target: relationship ? _.find(state.mapping.map.entities, {id: relationship.targetId}) : null,
    parentType: parentTypeSelector(state),
    isAddRelationshipInProgress: state.editor.isAddRelationshipInProgress,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectRelationshipTarget: (entityId) => dispatch(selectRelationshipTarget(entityId)),
    onUpdateRelationship: data => dispatch(updateRelationship(data)),
    onSaveRelationship: (data) => dispatch(saveRelationship(data)),
    onClickClose: () => dispatch(closeAddRelationship())
  }
}

const validEntitiesSelector = (state) => {
  if (!state.mapping.map) return null;

  let map = state.mapping.map;

  let link = state.editor.currentRelationshipCopy;
  let source = _.find(map.entities, {id: link.sourceId});

  // console.log('source', source)

  if (state.editor.currentRelationshipCopy.type === state.mapping.currentCollection.relationship.parentType) {
    let parentEntityType = parentTypeSelector(state);

    // valid entities are only of its parent type,
    return _.filter(map.entities, {type: parentEntityType});
  }

  // valid entities are of its same type,
  // not already one of its prerequisites
  //  and not itself
  let existingTargets = _.map(_.filter(map.relationships, {sourceId: source.id}), 'targetId');
  let existingSources = _.map(_.filter(map.relationships, {targetId: source.id}), 'sourceId');


  return _.filter(map.entities, e => {
    return e.type === source.type &&                        // must be of same type
          existingSources.indexOf(e.id) === -1 &&          // can't be a source
          existingTargets.indexOf(e.id) === -1 &&         // can't already be an existing prereq
          e.id !== source.id;                             // can't be itself
  });
}


export default connect(mapStateToProps, mapDispatchToProps)(AddRelationship)
