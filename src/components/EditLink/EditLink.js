import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import xoces from 'xoces'
const graphProvider = xoces.libs.graphProvider

import {keywordSearch} from '../../selectors/'
import './EditLink.scss'


class EditLink extends Component {

  constructor(props) {
    super(props);

    this.graph = graphProvider({...props.collection.relationship});
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.collection) return;

    this.graph = graphProvider({...this.props.collection.relationship})
  }

  render() {
    let props = this.props;

    if (!props.isEditLinkInProgress || !this.graph) return null;

    // console.log('props of EditLink', props)

    let prompt;
    if (props.relationshipType === props.collection.relationship.parentType) {
      prompt = (
        <p>Select a parent</p>
      )
    } else {
      prompt = (
        <p>Select a prerequisite</p>
      )
    }

    let sourceParent = this.graph.getParent(props.sourceEntity.id, props.map.entities, props.map.relationships)
    let targetParent = this.graph.getParent(props.targetEntity ? props.targetEntity.id : null, props.map.entities, props.map.relationships)
    // console.log('sourceParent', sourceParent)

    return (
      <div className="large-8 columns large-centered">
        <Modal isOpen={props.isEditLinkInProgress} contentLabel="edit-link-modal">
          <div className="flex-container space-between">
            <div className="flex-container align-center">
              <p className="entity-name">{props.sourceEntity[props.collection.displayKey]}</p>
              <p className="parent-label-for-entity">{sourceParent ? sourceParent[props.collection.displayKey] : null}</p>
            </div>
            <button className="button transparent" onClick={() => props.onClickClose()}>X</button>
          </div>

          {prompt}

          <div className="row">
            <div className="medium-8 columns">
              <Select className="edit-link__select-entity-dropdown"
                name="form-field-name"
                value={props.targetEntity ? props.targetEntity : null}
                labelKey="displayName"
                filterOption={keywordSearch}
                options={props.entities}
                onChange={(entity) => props.onSelectLinkTarget(entity)}
              />
            </div>
            <div className="medium-4 columns">
              <p className="parent-label-for-entity">{targetParent ? targetParent[props.collection.displayKey] : 'No parent'}</p>
            </div>
          </div>


          <div className="row">
            <div className="medium-push-7 medium-5 large-4 columns">
              <div className="flex-container link-outcome-modal__controls">
                <button className="button transparent" onClick={(e) => {e.preventDefault(); props.onClickClose()}}>Cancel</button>
                <button className="button" disabled={props.isUpdateLinkInProgress}
                        onClick={(e) => props.onSaveEditLink({source: props.sourceEntity, target: props.targetEntity, type: props.relationshipType})}>
                        {props.isUpdateLinkInProgress ? 'Working...' : 'Save'}
                </button>
              </div>
            </div>
          </div>


        </Modal>
      </div>

    )
  }


}

export default EditLink
