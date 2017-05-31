import axios from 'axios'
import {getDomain} from '../utilities'

export const SAVE_RELATIONSHIP_OPTIMISTIC = 'SAVE_RELATIONSHIP_OPTIMISTIC'
export const SAVE_RELATIONSHIP_SUCCESS = 'SAVE_RELATIONSHIP_SUCCESS'

function saveRelationshipOptimistic() {
  return {type: SAVE_RELATIONSHIP_OPTIMISTIC}
}

function saveRelationshipSuccess(relationship) {
  return {type: SAVE_RELATIONSHIP_SUCCESS, relationship}
}

export function saveRelationship(relationship) {
  return function(dispatch) {
    dispatch(saveRelationshipOptimistic())

    console.log('saveRelationship data', relationship);

    return axios({
      url: `${getDomain()}/api/mapping/relationships`,
      method: 'POST',
      data: {
        relationship
      }
    })
    .then( res => {
      let saved = res.data;

      dispatch(saveRelationshipSuccess(saved));

      return saved;
    })
    .catch( err => {
      console.error('error in saveRelationship', err)
    })
  }
}
