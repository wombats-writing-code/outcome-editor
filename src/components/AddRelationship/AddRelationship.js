import React, {Component} from 'react'

import _ from 'lodash';
import $ from 'jquery';
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import xoces from 'xoces'
const graphProvider = xoces.libs.graphProvider

import {keywordSearch} from '../../selectors/'
import './AddRelationship.scss'


class AddRelationship extends Component {

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

    if (!props.isAddRelationshipInProgress || !this.graph) return null;

    // console.log('props of AddRelationship', props)

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

    let sourceParent = this.graph.getParent(props.source.id, props.map.entities, props.map.relationships)
    let targetParent = this.graph.getParent(props.target ? props.target.id : null, props.map.entities, props.map.relationships)
    // console.log('sourceParent', sourceParent)

    return (
      <div className="large-8 columns large-centered">
        <Modal isOpen={props.isAddRelationshipInProgress} contentLabel="edit-link-modal">
          <div className="flex-container space-between">
            <div className="flex-container align-center">
              <p className="entity-name">{props.source[props.collection.displayKey]}</p>
              <p className="parent-label-for-entity">{sourceParent ? sourceParent[props.collection.displayKey] : null}</p>
            </div>
            <button className="button transparent" onClick={() => props.onClickClose()}>X</button>
          </div>

          {prompt}

          <div className="row">
            <div className="medium-8 columns">
              <Select className="edit-link__select-entity-dropdown"
                name="form-field-name"
                value={props.target ? props.target : null}
                labelKey="displayName"
                filterOption={(d, searchQuery) => keywordSearch(d.displayName, searchQuery)}
                options={props.entities}
                onChange={(entity) => props.onSelectRelationshipTarget(entity ? entity.id : null)}
              />
            </div>
            <div className="medium-4 columns">
              <p className="parent-label-for-entity">{targetParent ? targetParent[props.collection.displayKey] : ''}</p>
            </div>
          </div>

          <div className="row">
            <div className="columns">
              <div className="flex-container link-outcome-modal__controls">
                <button className="button transparent" onClick={(e) => {e.preventDefault(); props.onClickClose()}}>Cancel</button>
                <button className="button" disabled={props.isSaveRelationshipInProgress || !props.relationship.targetId}
                        onClick={() => props.onSaveRelationship(props.relationship)}>
                        {props.isSaveRelationshipInProgress ? 'Working...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }


}

export default AddRelationship
