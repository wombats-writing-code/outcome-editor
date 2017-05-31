import axios from 'axios'
import {getDomain} from '../utilities'


export const UPDATE_RELATIONSHIP_OPTIMISTIC = 'UPDATE_RELATIONSHIP_OPTIMISTIC'
export const UPDATE_RELATIONSHIP_SUCCESS = 'UPDATE_RELATIONSHIP_SUCCESS'


function updateRelationshipOptimistic() {
  return {type: UPDATE_RELATIONSHIP_OPTIMISTIC}
}

function updateRelationshipSuccess(link) {
  return {type: UPDATE_RELATIONSHIP_SUCCESS, link}
}

export function updateRelationship(relationship) {
  return function(dispatch) {
    dispatch(updateRelationshipOptimistic())

    console.log('updateRelationship', relationship)

    return axios({
      url: `${getDomain()}/api/mapping/relationships/${relationship.id}`,
      method: 'PUT',
      data: { relationship }
    })
    .then( res => {
      let updated = res.data;

      dispatch(updateRelationshipSuccess(updated));

      return updated;
    })
    .catch( err => {
      console.error('error in updateRelationship', err)
    })
  }
}
