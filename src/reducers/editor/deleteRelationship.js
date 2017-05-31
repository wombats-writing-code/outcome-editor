import axios from 'axios'
import {getDomain} from '../utilities'

export const DELETE_RELATIONSHIP_OPTIMISTIC = 'DELETE_RELATIONSHIP_OPTIMISTIC'
export const DELETE_RELATIONSHIP_SUCCESS = 'DELETE_RELATIONSHIP_SUCCESS'

function deleteRelationshipOptimistic() {
  return {type: DELETE_RELATIONSHIP_OPTIMISTIC}
}

function deleteRelationshipSuccess(relationship) {
  return {type: DELETE_RELATIONSHIP_SUCCESS, relationship}
}

export function deleteRelationship(relationship) {
  return function(dispatch) {
    dispatch(deleteRelationshipOptimistic())

    return axios({
      url: `${getDomain()}/api/mapping/relationships/${relationship.id}`,
      method: 'DELETE',
    })
    .then( res => {
      let result = res.data;

      dispatch(deleteRelationshipSuccess(relationship));

      return relationship;
    })
    .catch( err => {
      console.error('error in deleteRelationship', err)
    })  }
}
