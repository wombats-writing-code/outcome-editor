
export const SELECT_EDIT_ENTITY = 'SELECT_EDIT_ENTITY'
export const CLOSE_EDIT_ENTITY = 'CLOSE_EDIT_ENTITY'

export function selectEditEntity(entity) {
  return {type: SELECT_EDIT_ENTITY, entity}
}

export function closeEditEntity() {
  return {type: CLOSE_EDIT_ENTITY}
}
