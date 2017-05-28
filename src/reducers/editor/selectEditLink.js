
export const SELECT_LINK_TARGET = 'SELECT_LINK_TARGET'
export const SELECT_EDIT_LINK = 'SELECT_EDIT_LINK'
export const CLOSE_EDIT_LINK = 'CLOSE_EDIT_LINK'
export const SAVE_EDIT_LINK_OPTIMISTIC = 'SAVE_EDIT_LINK_OPTIMISTIC'
export const SAVE_EDIT_LINK_SUCCESS = 'SAVE_EDIT_LINK_SUCCESS'

export function selectLinkTarget(entity) {
  return {type: SELECT_LINK_TARGET, entity}
}

export function selectEditLink(data) {
  return {type: SELECT_EDIT_LINK, data}
}

export function closeEditLink() {
  return {type: CLOSE_EDIT_LINK}
}

function saveEditLinkOptimistic() {
  return {type: SAVE_EDIT_LINK_OPTIMISTIC}
}

function saveEditLinkSuccess(data) {
  return {type: SAVE_EDIT_LINK_SUCCESS, data}
}

export function saveEditLink(data) {
  return function(dispatch) {
    dispatch(saveEditLinkOptimistic())

    return axios({
      url: `${getDomain()}/api/mapping?domainId=${collection.domain}`,
      method: 'POST',
      data: data
    })
    .then( res => {
      let data = res.data;

      dispatch(saveEditLinkSuccess(data));

      return map;
    })
    .catch( err => {
      console.error('error in saveEditLink', err)
    })
  }
}
