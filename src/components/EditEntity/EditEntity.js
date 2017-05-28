import React, {Component} from 'react'
import _ from 'lodash'
import Modal from 'react-modal'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './EditEntity.scss'

import {uneditableProperties} from '../../reducers/editor/'

class EditEntity extends Component {

  render() {
    let props = this.props;

    let saveButtonText = this._canSave() ? 'Save' : 'Working...';

    return (
      <div className="edit-entity large-8 columns">
        <Modal isOpen={props.isEditEntityInProgress || props.isNewEntityInProgress} contentLabel="edit-entity-modal">
          <div className="flex-container space-between align-center edit-entities__section-bar">
            <p className="bold edit-entities__section-title">Edit</p>
            <button className="button close" onClick={() => this._onClose()}>X</button>
          </div>
          {_.map(_.keys(props.entity), (propertyName, idx) => {
            if (_.startsWith(propertyName, '_') || uneditableProperties.indexOf(propertyName) > -1) {
              return null
            };

            return (
              <div className="edit-entity-property " key={`property-${idx}`}>
                <div className="flex-container ">
                  <label className="edit-entity__label">{propertyName}</label>
                  <input className="input edit-entity__input"
                          value={props.entity[propertyName]}
                          onChange={(e) => props.onChange({[propertyName]: e.target.value})}/>
                </div>
              </div>
            )
          })}

          <div className="medium-4 medium-push-8 edit-entity-buttons flex-container space-between">
            <button className="button edit-entity__button" onClick={() => this._onClose()}>Cancel</button>
            <button className="button edit-entity__button" disabled={!this._canSave()}
                    onClick={() => this._onClickSave(props.entity)}>
              {saveButtonText}
            </button>
          </div>
        </Modal>
      </div>
    )
  }

  _onClose() {
    if (this.props.isEditEntityInProgress) {
      this.props.onCloseEditEntity()
    } else {
      this.props.onCloseNewEntity()
    }
  }

  _canSave() {
    if (this.props.isUpdateEntityInProgress || this.props.isSaveEntityInProgress) {
      return false;
    }

    return true;
  }

  _onClickSave(entity) {
    if (this.props.isEditEntityInProgress) {
      return this.props.onUpdate(entity);
    } else {
      return this.props.onSave(entity)
    }
  }
}


export default EditEntity
