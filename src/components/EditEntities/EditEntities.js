import React, {Component} from 'react'
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import xoces from 'xoces'

const graphProvider = xoces.libs.graphProvider

import {HAS_PREREQUISITE_OF} from '../../reducers/mapping'
import {keywordSearch} from '../../selectors/'

import EntityInfo from '../EntityInfo'
import AddRelationship from '../AddRelationship'
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
        <EntityInfo entity={props.currentEntity} />
      )

      let confirmDelete;
      if (this.state.isConfirmDeleteVisible) {
        confirmDelete = (
          <div className="confirm-delete__wrapper">
            <input type="text" className="input confirm-delete__input small" value={this.state.confirmDeleteValue}
                  onChange={(e) => this.setState({confirmDeleteValue: e.target.value})}/>
            <button className="button confirm-delete small" disabled={props.isDeleteEntityInProgress}
                    onClick={() => this._onConfirmDelete(props.currentEntity)}>
              {props.isDeleteEntityInProgress ? 'Working...' : 'Confirm delete'}
            </button>
          </div>
        )
      }


      editEntityButtons = (
        <div className="medium-12 large-8 columns flex-container align-top">
          <button className="button edit-entity-control" onClick={() => props.onClickEditEntity(props.currentEntity)}>
            Edit {_.lowerCase(props.editingEntityType)}
          </button>
          <button className="button edit-entity-control transparent" onClick={() => this._onClickDelete()}>
            {this.state.isConfirmDeleteVisible ? 'Cancel' : 'Delete'}
          </button>
          {confirmDelete}
        </div>
      )

      if (props.currentEntity.type !== _.first(props.collection.hierarchy)) {
        editParents = (
          <div>
            <div className="flex-container space-between align-center edit-entities__section-bar">
              <p className="bold edit-entities__section-title">{_.capitalize(props.editingEntityTypeParent)}</p>
              <button className="button link-button">Relationship a {_.capitalize(props.editingEntityTypeParent)}</button>
            </div>

            <EntityList currentEntity={props.currentEntity}
                        entities={this.graph ? this.graph.getParentsAll(props.currentEntity.id, props.map.entities, props.map.relationships) : null}
                        onClickRelationship={(entity) => props.onClickAddRelationship({target: entity, type: props.collection.relationship.parentType, domain: props.collection.domain})}
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
              <button className="button link-button" onClick={() => props.onClickAddRelationship({source: props.currentEntity, type: HAS_PREREQUISITE_OF, domain: props.collection.domain})}>
                Add a prereq
              </button>
            </div>

            <EntityList currentEntity={props.currentEntity}
                        entities={this.graph ? this.graph.getOutgoingEntities(props.currentEntity.id, props.map.entities, props.map.relationships) : []}
                        onClickDelete={(entity) => this._onClickDeleteRelationship(props.currentEntity, entity, HAS_PREREQUISITE_OF)}
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

    let addRelationship;
    if (props.isAddRelationshipInProgress) {
      addRelationship = (
        <AddRelationship />
      )
    }


    return (
      <div >
        <h4>{props.entityType}</h4>

        <div className="row">
          <div className="medium-9 columns">
            <Select name="form-field-name" className="select-entity"
                    placeholder={`Select ${_.lowerCase(props.editingEntityType)}...`}
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
        </div>

        <div className="row">
          {editEntityButtons}
        </div>


        {editEntity}
        {addRelationship}

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

  _onClickDeleteRelationship(source, target, relationshipType) {
    let relationship = this.graph.getOutgoingEdges(source.id, target.id, relationshipType, this.props.map.relationships)[0];
    this.props.onClickDeleteRelationship(relationship);

    // this.props.onClickDeleteRelationship({
    //   relationships: this.graph.getOutgoingEdges(source.id, target.id, relationshipType, this.props.map.relationships),
    //   source,
    //   target,
    // })
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
