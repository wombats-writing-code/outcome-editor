import { connect } from 'react-redux'
import {createSelector} from 'reselect'
import _ from 'lodash'

import {closeNewEntity} from '../../reducers/editor/selectNewEntity'
import {closeEditEntity} from '../../reducers/editor/selectEditEntity'
import {changeEditEntity} from '../../reducers/editor/changeEditEntity'
import {updateEntity} from '../../reducers/editor/updateEntity'
import {saveEntity} from '../../reducers/editor/saveEntity'

import EditEntity from './EditEntity'


const mapStateToProps = (state, ownProps) => {
  // console.log('state.editor in EditEntity container', state.editor)

  return {
    isNewEntityInProgress: state.editor.isNewEntityInProgress,
    isEditEntityInProgress: state.editor.isEditEntityInProgress,
    isUpdateEntityInProgress: state.editor.isUpdateEntityInProgress,
    isSaveEntityInProgress: state.editor.isSaveEntityInProgress,
    entity: state.editor.currentEntityCopy,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseNewEntity: () => dispatch(closeNewEntity()),
    onCloseEditEntity: () => dispatch(closeEditEntity()),
    onChange: (data) => dispatch(changeEditEntity(data)),
    onUpdate: entity => dispatch(updateEntity(entity)),
    onSave: entity => dispatch(saveEntity(entity)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditEntity)
