
export const SELECT_NEW_ENTITY = 'SELECT_NEW_ENTITY'
export const CLOSE_NEW_ENTITY = 'CLOSE_NEW_ENTITY'

export function selectNewEntity(entityType, domain) {
  return {type: SELECT_NEW_ENTITY, entityType, domain}
}

export function closeNewEntity() {
  return {type: CLOSE_NEW_ENTITY}
}
