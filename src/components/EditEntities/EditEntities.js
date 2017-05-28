import React, {Component} from 'react'
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import xoces from 'xoces'

const graphProvider = xoces.libs.graphProvider

import {keywordSearch} from '../../selectors/'
import {invisibleProperties} from '../../reducers/editor'

import EditLink from '../../components/EditLink'
import EditEntity from '../EditEntity'
import EntityList from '../EntityList'
import VisualizeEntity from '../VisualizeEntity'



import './EditEntities.scss'

class EditEntities extends Component {

  constructor() {
    super();
    this.state = {
      searchQuery: '',
      isConfirmDeleteVisible: false,
      confirmDeleteValue: ''
    }

    this.graph = null;

  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.collection) return;

    if (this.props.isDeleteEntityInProgress !== nextProps.isDeleteEntityInProgress) {
      this.setState({
        isConfirmDeleteVisible: false,
        confirmDeleteValue: ''
      })
    }

    // console.log('xoces', xoces)
    // console.log('collection', this.props.collection)

    this.graph = graphProvider({...this.props.collection.relationship})
  }


  render() {
    let props = this.props;

    if (!props.editingEntityType || !props.collection) {
      return null;
    }

    let entityInfo, editEntityButtons, editParents, editPrerequisites, visualizeEntity;
    if (props.currentEntity) {
      entityInfo = (
        <div className="entity-info">
          {_.map(_.keys(props.currentEntity), (propertyName, idx) => {
            if (_.startsWith(propertyName, '_') || invisibleProperties.indexOf(propertyName) > -1) {
              return null
            };

            return (
              <div key={`entity-info__property-${idx}`}>
                <div className="flex-container ">
                  <label className="entity-info__label">{propertyName}:</label>
                  <p className="entity-info__value">{props.currentEntity[propertyName]}</p>
                </div>
              </div>
            )
          })}
        </div>
      )

      let confirmDelete;
      if (this.state.isConfirmDeleteVisible) {
        confirmDelete = (
          <div>
            <input type="text" className="" value={this.state.confirmDeleteValue}
                  onChange={(e) => this.setState({confirmDeleteValue: e.target.value})}/>
            <button className="button warning confirm-delete" disabled={props.isDeleteEntityInProgress}
                    onClick={() => this._onConfirmDelete(props.currentEntity)}>
              {props.isDeleteEntityInProgress ? 'Working...' : 'Confirm delete'}
            </button>
          </div>
        )
      }


      editEntityButtons = (
        <div className="medium-6 columns flex-container space-between align-top">
          {confirmDelete}
          <button className="button edit-entity-button warning" onClick={() => this._onClickDelete()}>
            {this.state.isConfirmDeleteVisible ? 'Cancel' : 'Delete'}
          </button>
          <button className="button edit-entity-button" onClick={() => props.onClickEditEntity(props.currentEntity)}>
            Edit {_.lowerCase(props.editingEntityType)}
          </button>
        </div>
      )

      if (props.currentEntity.type !== _.first(props.collection.hierarchy)) {
        editParents = (
          <div>
            <div className="flex-container space-between align-center edit-entities__section-bar">
              <p className="bold edit-entities__section-title">{_.capitalize(props.editingEntityTypeParent)}</p>
              <button className="button link-button">Link a {_.capitalize(props.editingEntityTypeParent)}</button>
            </div>

            <EntityList currentEntity={props.currentEntity}
                        entities={this.graph ? this.graph.getParentsAll(props.currentEntity.id, props.map.entities, props.map.relationships) : null}
                        onClickLink={(entity) => props.onClickEditLink({source: props.currentEntity, target: entity, type: props.collection.relationship.parentType})}
                      />
          </div>
        )

        visualizeEntity = (
          <VisualizeEntity relationships={props.map.relationships}
              visualizedEntities={props.visualizedEntities} />
        )
      }


      if (props.currentEntity.type === _.last(props.collection.hierarchy)) {
        editPrerequisites = (
          <div>
            <div className="flex-container space-between align-center edit-entities__section-bar">
              <p className="bold edit-entities__section-title">Prerequisites</p>
              <button className="button link-button">Add a prereq</button>
            </div>

            <EntityList currentEntity={props.currentEntity}
                        entities={this.graph ? this.graph.getOutgoingEntities(props.currentEntity.id, props.map.entities, props.map.relationships) : []}
                        onClickLink={(entity) => props.onClickEditLink({source: props.currentEntity, target: entity, type: props.collection.relationship.parentType})}
                      />
          </div>
        )
      }


    }

    let editEntity;
    if (props.isEditEntityInProgress || props.isNewEntityInProgress) {
      editEntity = (
        <EditEntity />
      )
    }

    let editLink;
    if (props.isEditLinkInProgress) {
      editLink = (
        <EditLink />
      )
    }


    return (
      <div >
        <h4>{props.entityType}</h4>

        <div className="row">
          <div className="medium-9 columns">
            <Select name="form-field-name" className="select-entity"
                    placeholder={`Select a ${_.lowerCase(props.editingEntityType)}...`}
                    value={props.currentEntity}
                    labelKey={"displayName"}
                    options={props.entities}
                    onChange={(d) => props.onSelectEntity(d)}
                    filterOption={(d, searchQuery) => keywordSearch(d.displayName, searchQuery)}
                  />
          </div>
          <div className="medium-3 columns">
            <button className="button" onClick={() => props.onClickNewEntity(props.editingEntityType, props.collection.domain)}>
              Add new {_.lowerCase(props.editingEntityType)}
            </button>
          </div>
        </div>

        <div className="row">
          <div className="columns">
            {entityInfo}
          </div>

          {editEntityButtons}
        </div>


        {editEntity}
        {editLink}

        <div className="row">
          <div className="medium-5 columns">
            {editParents}
          </div>
          <div className="medium-7 columns">
            {editPrerequisites}
          </div>
        </div>

        <div className="row">
          <div className="columns">
            {visualizeEntity}
          </div>
        </div>

      </div>
    )
  }

  _onClickDelete() {
    this.setState({isConfirmDeleteVisible: !this.state.isConfirmDeleteVisible})
  }

  _onConfirmDelete(entity) {
    if (this.state.confirmDeleteValue === entity.id) {
      return this.props.onDeleteEntity(entity);
    }
  }
}

export default EditEntities
