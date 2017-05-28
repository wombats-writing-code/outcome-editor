export const SELECT_ENTITY_TYPE = 'SELECT_ENTITY_TYPE'
export const SELECT_ENTITY = 'SELECT_ENTITY'

export function selectEntityType(entityType) {
  return {type: SELECT_ENTITY_TYPE, entityType}
}

export function selectEntity(entity) {
  return {type: SELECT_ENTITY, entity}
}
