import axios from 'axios'
import {getDomain} from '../utilities'

export const UPDATE_ENTITY_OPTIMISTIC = 'UPDATE_ENTITY_OPTIMISTIC'
export const UPDATE_ENTITY_SUCCESS = 'UPDATE_ENTITY_SUCCESS'

function updateEntityOptimistic() {
  return {type: UPDATE_ENTITY_OPTIMISTIC}
}

function updateEntitySuccess(entity) {
  return {type: UPDATE_ENTITY_SUCCESS, entity}
}

export function updateEntity(entity) {
  return function(dispatch) {
    dispatch(updateEntityOptimistic())

    console.log('updateEntity data', entity);

    return axios({
      url: `${getDomain()}/api/mapping/entities/${entity.id}`,
      method: 'PUT',
      data: {entity}
    })
    .then( res => {
      let updatedEntity = res.data;

      dispatch(updateEntitySuccess(updatedEntity));

      return entity;
    })
    .catch( err => {
      console.error('error in updateEntity', err)
    })
  }
}
