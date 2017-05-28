import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {keywordSearch} from '../../selectors/'
import './EditLink.scss'


class EditLink extends Component {

  render() {
    let props = this.props;

    if (!props.isEditLinkInProgress) return null;

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

    let module;

    return (
      <div className="large-8 columns large-centered">
        <Modal isOpen={props.isEditLinkInProgress} contentLabel="edit-link-modal">
          <div className="flex-container space-between">
            <p className="">{props.sourceEntity.displayName}</p>
            <button className="button close" onClick={() => props.onClickClose()}>X</button>
          </div>

          {prompt}

          <div className="row">
            <div className="medium-9 large-9 columns">
              <Select className="edit-link__select-entity-dropdown"
                name="form-field-name"
                value={props.targetEntity ? props.targetEntity : null}
                labelKey="displayName"
                filterOption={keywordSearch}
                options={props.entities}
                onChange={(entity) => props.onSelectLinkTarget(entity)}
              />
            </div>
            <div className="medium-3 columns">
              <p className="parent-label-for-entity">{module ? module.displayName : 'No parent'}</p>
            </div>
          </div>


          <div className="row">
            <div className="medium-9 large-9 columns">
              <div className="flex-container link-outcome-modal__controls">
                <button className="button" onClick={(e) => {e.preventDefault(); props.onClickClose()}}>Cancel</button>
                <button className="button form__save-button" disabled={props.isUpdateLinkInProgress}
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
