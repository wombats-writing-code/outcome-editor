import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'

import {closeEditLink, selectLinkTarget, saveEditLink} from '../../reducers/editor/selectEditLink'
import {parentTypeSelector} from '../../selectors/'

import EditLink from './EditLink'


const mapStateToProps = (state, ownProps) => {
  // console.log('state.editor in EditEntity container', state.editor)

  return {
    collection: state.mapping.currentCollection,
    map: state.mapping.map,
    entities: validEntitiesSelector(state),
    isEditLinkInProgress: state.editor.isEditLinkInProgress,
    sourceEntity: state.editor.currentSourceEntity,
    targetEntity: state.editor.currentTargetEntity,
    relationshipType: state.editor.currentRelationshipType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectLinkTarget: (entity) => dispatch(selectLinkTarget(entity)),
    onSaveEditLink: (data) => dispatch(saveEditLink(data)),
    onClickClose: () => dispatch(closeEditLink())
  }
}

const validEntitiesSelector = (state) => {
  if (!state.mapping.map) return null;

  if (state.editor.currentRelationshipType === state.mapping.currentCollection.relationship.parentType) {
    let parentEntityType = parentTypeSelector(state);

    // valid entities are only of its parent type, and not itself
    return _.filter(state.mapping.map.entities, e => {
      return e.type === parentEntityType && e.id !== state.editor.currentSourceEntity.id;
    });
  }

  // valid entities are of its same type, and not itself
  return _.filter(state.mapping.map.entities, e => {
    return e.type === state.editor.currentSourceEntity.type && e.id !== state.editor.currentSourceEntity.id;
  });
}


export default connect(mapStateToProps, mapDispatchToProps)(EditLink)
