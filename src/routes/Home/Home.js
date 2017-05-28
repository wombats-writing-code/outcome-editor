import React, {Component} from 'react'
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import EditEntities from '../../components/EditEntities'

import './Home.scss'


class Home extends Component {

  componentDidMount() {
    if (this.props.currentCollection) {
      this.props.onSelectCollection(this.props.currentCollection)
    }
  }

  render() {
    let props = this.props;

    let editEntities;
    if (props.editingEntityType) {
      editEntities = (
        <EditEntities />
      )
    }

    return (
      <div>
        <div className="row">
          <h2>{props.currentCollection ? props.currentCollection.displayName : null}</h2>

          <div className="flex-container align-center columns">
            {_.map(props.currentCollection.hierarchy, name => {
              let activeClass = name === props.editingEntityType ? 'is-active' : null;

              return (
                <button className={`button select-entity-type-button ${activeClass}`} key={`button ${name}`}
                        onClick={() => props.onSelectEntityType(name)}>
                  {name}
                </button>
              )
            })}
          </div>

          <div className="medium-12 columns">
            {editEntities}
          </div>
        </div>


      </div>
    )
  }

}

export default Home
