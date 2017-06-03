import axios from 'axios'
import {getDomain, arrayEncode} from '../utilities'

export const GET_MAPPING_OPTIMISTIC = 'GET_MAPPING_OPTIMISTIC'
export const GET_MAPPING_SUCCESS = 'GET_MAPPING_SUCCESS'

function getMappingOptimistic() {
  return {type: GET_MAPPING_OPTIMISTIC}
}

function getMappingSuccess(map) {
  return {type: GET_MAPPING_SUCCESS, map}
}

export function getMapping(collection, data) {
  if (!data.entityTypes) {
    throw TypeError('entityTypes must be provided')
  }

  let relationshipTypesString = arrayEncode(data.relationshipTypes, 'relationships')
  let entityTypesString = arrayEncode(data.entityTypes, 'entities')


  return function(dispatch) {
    dispatch(getMappingOptimistic())

    return axios({
      url: `${getDomain()}/api/mapping?domainId=${collection.domain}${entityTypesString}${relationshipTypesString}`,
    })
    .then( res => {
      let data = res.data;
      let map = {
        entities: data.entities,
        relationships: data.relationships,
      };

      dispatch(getMappingSuccess(map));

      return map;
    })
    .catch( err => {
      console.error('error in getMapping', err)
    })
  }
}
