

export const SELECT_ADD_RELATIONSHIP = 'SELECT_ADD_RELATIONSHIP'
export const SELECT_RELATIONSHIP_TARGET = 'SELECT_RELATIONSHIP_TARGET'
export const CLOSE_ADD_RELATIONSHIP = 'CLOSE_ADD_RELATIONSHIP'

export function selectRelationshipTarget(entityId) {
  return {type: SELECT_RELATIONSHIP_TARGET, entityId}
}

export function selectAddRelationship(data) {
  return {type: SELECT_ADD_RELATIONSHIP, data}
}

export function closeAddRelationship() {
  return {type: CLOSE_ADD_RELATIONSHIP}
}
