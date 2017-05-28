import React, {Component} from 'react'

import './EntityList.scss'

class EntityList extends Component {
  render() {
    let props = this.props;
    // console.log('props of EntityList', props)

    if (!props.entities || props.entities.length === 0) return null;

    return (
      <div className="entity-list">
        {_.map(props.entities, entity => {
          return (
            <div key={`entity-list__${entity._id}`} className="entity-list__item flex-container space-between">
              <p>{entity.displayName}</p>
              <button className="button link-icon-button">
                <img src={require('./assets/link-icon.png')} onClick={() => props.onClickLink(entity)}/>
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default EntityList
