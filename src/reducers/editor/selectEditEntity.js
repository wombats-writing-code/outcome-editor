
export const SELECT_EDIT_ENTITY = 'SELECT_EDIT_ENTITY'
export const CLOSE_EDIT_ENTITY = 'CLOSE_EDIT_ENTITY'
export const SAVE_EDIT_ENTITY_OPTIMISTIC = 'SAVE_EDIT_ENTITY_OPTIMISTIC'
export const SAVE_EDIT_ENTITY_SUCCESS = 'SAVE_EDIT_ENTITY_SUCCESS'

export function selectEditEntity(entity) {
  return {type: SELECT_EDIT_ENTITY, entity}
}

export function closeEditEntity() {
  return {type: CLOSE_EDIT_ENTITY}
}

function saveEditEntityOptimistic() {
  return {type: SAVE_EDIT_ENTITY_OPTIMISTIC}
}

function saveEditEntitySuccess(data) {
  return {type: SAVE_EDIT_ENTITY_SUCCESS, data}
}

export function saveEditEntity(data) {
  return function(dispatch) {
    dispatch(saveEditEntityOptimistic())

    return axios({
      url: `${getDomain()}/api/mapping?domainId=${collection.domain}`,
      method: 'POST',
      data: data
    })
    .then( res => {
      let data = res.data;

      dispatch(saveEditEntitySuccess(data));

      return map;
    })
    .catch( err => {
      console.error('error in saveEditEntity', err)
    })
  }
}
