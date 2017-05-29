import React, {Component} from 'react'
import _ from 'lodash'

import {invisibleProperties} from '../../reducers/editor'


class EntityInfo extends Component {
  render() {
    let props = this.props;

    if (!props.entity) return null;


    return (
      <div className="entity-info">
        {_.map(_.keys(props.entity), (propertyName, idx) => {
          if (_.startsWith(propertyName, '_') || invisibleProperties.indexOf(propertyName) > -1) {
            return null
          };

          // console.log(propertyName)

          return (
            <div key={`entity-info__property-${idx}`}>
              <div className="flex-container ">
                <label className="entity-info__label">{propertyName}:</label>
                <p className="entity-info__value">{props.entity[propertyName]}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default EntityInfo
