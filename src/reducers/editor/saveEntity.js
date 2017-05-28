import axios from 'axios'
import {getDomain} from '../utilities'

export const SAVE_ENTITY_OPTIMISTIC = 'SAVE_ENTITY_OPTIMISTIC'
export const SAVE_ENTITY_SUCCESS = 'SAVE_ENTITY_SUCCESS'

function saveEntityOptimistic() {
  return {type: SAVE_ENTITY_OPTIMISTIC}
}

function saveEntitySuccess(entity) {
  return {type: SAVE_ENTITY_SUCCESS, entity}
}

export function saveEntity(data) {
  return function(dispatch) {
    dispatch(saveEntityOptimistic())

    console.log('saveEntity data', data);

    return axios({
      url: `${getDomain()}/api/mapping/entities`,
      method: 'POST',
      data: {
        entity: data
      }
    })
    .then( res => {
      let entity = res.data;

      dispatch(saveEntitySuccess(entity));

      return entity;
    })
    .catch( err => {
      console.error('error in saveEntity', err)
    })
  }
}
