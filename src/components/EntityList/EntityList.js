import React, {Component} from 'react'

import './EntityList.scss'

class EntityList extends Component {

  constructor() {
    super();

    this.state = {
      isConfirmDeleteVisible: false
    }
  }

  render() {
    let props = this.props;
    // console.log('props of EntityList', props)

    if (!props.entities || props.entities.length === 0) return null;

    let clickableStyle;
    if (props.isClickable) {
      clickableStyle = 'is-clickable'
    }

    return (
      <div className="entity-list">
        {_.map(props.entities, entity => {
          let confirmDelete;
          if (this.state.isConfirmDeleteVisible === entity) {
            confirmDelete = (
              <div className="small">
                <span className="entity-list__confirm-delete" onClick={() => this._onClickDelete(entity)}>Confirm delete</span>
                <span className="entity-list__cancel-delete" onClick={() => this.setState({isConfirmDeleteVisible: false})}>Cancel</span>
              </div>
            )
          }

          return (
            <div key={`entity-list__${entity._id}`} className="entity-list__item flex-container space-between">
              <p className={`entity-list__item-name ${clickableStyle}`} onClick={() => this._onClick(entity)}>{entity.displayName}</p>
              <div className="flex-container align-center entity-list__item-control">
                <button className="button link-icon-button">
                  <img src={require('./assets/delink-icon.png')} onClick={() => this.setState({isConfirmDeleteVisible: entity})}/>
                </button>
                {confirmDelete}
              </div>

            </div>
          )
        })}
      </div>
    )
  }

  _onClick(entity) {
    if (this.props.isClickable) {
      this.props.onClick(entity)
    }
  }

  _onClickDelete(entity) {
    this.props.onClickDelete(entity)
  }
}

export default EntityList
