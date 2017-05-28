import axios from 'axios'
import {getDomain} from '../utilities'

export const DELETE_ENTITY = 'DELETE_ENTITY'
export const DELETE_ENTITY_OPTIMISTIC = 'DELETE_ENTITY_OPTIMISTIC'
export const DELETE_ENTITY_SUCCESS = 'DELETE_ENTITY_SUCCESS'

function deleteEntityOptimistic() {
  return {type: DELETE_ENTITY_OPTIMISTIC}
}

function deleteEntitySuccess(entity) {
  return {type: DELETE_ENTITY_SUCCESS, entity}
}

export function deleteEntity(entity) {
  return function(dispatch) {
    dispatch(deleteEntityOptimistic())

    return axios({
      url: `${getDomain()}/api/mapping/entities/${entity.id}`,
      method: 'DELETE',
    })
    .then( res => {
      let result = res.data;

      dispatch(deleteEntitySuccess(entity));

      return entity;
    })
    .catch( err => {
      console.error('error in deleteEntity', err)
    })  }
}
