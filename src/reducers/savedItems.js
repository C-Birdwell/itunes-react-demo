import { SAVED_ITEMS, SAVED_ITEMS_NEW, SAVED_ITEMS_DELETE } from '../actions/types'
const INITIAL_STATE = {
  savedArray: [],
  savedChunk: [],
  savedAddItem: {},
}

const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)
  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

const deleteFavorite = val => {
  return []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVED_ITEMS:
      return {
        ...state,
        savedArray: action.payload,
        savedChunk: chunk(action.payload, 4),
      }
    case SAVED_ITEMS_NEW:
      return { ...state, savedAddItem: action.payload }

    case SAVED_ITEMS_DELETE:
      return { ...state }
    default:
      return { ...state }
  }
}
