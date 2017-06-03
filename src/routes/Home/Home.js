import React, {Component} from 'react'
import _ from 'lodash'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Header from '../../components/Header'
import EditEntities from '../../components/EditEntities'

import './Home.scss'


class Home extends Component {

  componentDidMount() {
    // console.log('user', this.props.user)
    if (this.props.user) {
      this.props.getCollections(this.props.user.collections);
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

    let collectionBody;
    if (props.currentCollection) {
      collectionBody = (
        <div className="row">
          <div className="flex-container align-center columns select-entity-type">
            <p className="home__collection-name mute small">{props.currentCollection ? props.currentCollection.displayName : null}:</p>

            {_.map(props.currentCollection.hierarchy, name => {
              let activeClass = name === props.editingEntityType ? 'is-active' : null;

              return (
                <button className={`button select-entity-type-button ${activeClass}`} key={`button ${name}`}
                        onClick={() => props.onSelectEntityType(name)}>
                  {_.capitalize(name)}
                </button>
              )
            })}
          </div>

          <div className="medium-12 columns">
            {editEntities}
          </div>
        </div>

      )
    }


    return (
      <div>
        <Header currentCollection={props.currentCollection} collections={props.collections} onSelect={props.onSelectCollection}
                onLogout={props.onLogout}
        />

        {collectionBody}

      </div>
    )
  }

}

export default Home
