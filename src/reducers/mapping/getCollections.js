import axios from 'axios'
import {getDomain, arrayEncode} from '../utilities'

export const GET_COLLECTIONS_OPTIMISTIC = 'GET_COLLECTIONS_OPTIMISTIC'
export const GET_COLLECTIONS_SUCCESS = 'GET_COLLECTIONS_SUCCESS'

function getCollectionsOptimistic() {
  return {type: GET_COLLECTIONS_OPTIMISTIC}
}

function getCollectionsSuccess(collections) {
  return {type: GET_COLLECTIONS_SUCCESS, collections}
}

export function getCollections(collectionIds) {
  return function(dispatch) {
    dispatch(getCollectionsOptimistic())

    let collectionIdsString = arrayEncode(collectionIds, 'collectionIds')

    return axios.request({
      method: 'get',
      url: `${getDomain()}/api/collections?all=false&${collectionIdsString}`,
      data: {collectionIds}
    })
    .then( res => {
      let collections = res.data;

      dispatch(getCollectionsSuccess(collections));

      return collections;
    })
    .catch( err => {
      console.error('error in getCollections', err)
    })
  }
}
