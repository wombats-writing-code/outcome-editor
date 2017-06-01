import React, {Component} from 'react'
import xoces from 'xoces'
import $ from 'jquery'

import './VisualizeEntity.scss'

class VisualizeEntity extends Component {
  constructor(props) {
    super(props);
    this.widget = null;
  }

  componentDidMount() {
    this._updateXoces(this.props, this.widget);
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate')

    $('#xoces-container').empty();
    // $('svg').empty()
    this._updateXoces(this.props, this.widget);
  }

  _updateXoces(props, widget) {
    if (props.visualizedEntities && props.visualizedEntities.length > 0) {
      // console.log('props in _updateXoces', props)

      let config = {
        data: {
          entities: props.visualizedEntities,                  // required!
          relationships: props.relationships
        },
        entityLabelKey: 'displayName',                    // required!
        nodeLabelKey: 'displayName',
        // nodeColor: (entity) => {
        //   return props.questionCountForEntity[entity.id] === 0 ? '#FF6F69' : '#6A9870'
        // },
        relationship: {
          sourceRef: 'sourceId',                       // required!
          targetRef: 'targetId',                       // required!
        },
        width: '100%',
        height: 500,
        colorScheme: 'light',                  // 'light' or 'dark'
      };

      widget = xoces.widgets.TreeWidget.new(config);
      widget.render({container: 'xoces-container'})
    }
  }

  render() {
    let props = this.props;
    // console.log('props of VisualizeEntity', props)

    return (
      <div>
        <div className="flex-container space-between align-center edit-entities__section-bar">
          <p className="bold edit-entities__section-title">
            Visualize &nbsp;
            <span className="light small mute italic">
              Most fundamental outcomes are on top, leading to more downstream outcomes on the bottom. The ENTIRE chain is shown.</span>
          </p>
        </div>
        <div id="xoces-container"></div>
      </div>
    )
  }
}

export default VisualizeEntity
