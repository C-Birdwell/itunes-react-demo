import { RESPONSE_ARRAY, QUERY_STRING, QUERY_CATEGORY, LOADING } from '../actions/types'
const INITIAL_STATE = {
  queryString: '',
  queryCategory: 'all',
  loading: false,
  responseArray: [],
  responseChunk: [],
}

const chunk = (array, size) => {
  if (!array) return []
  const firstChunk = array.slice(0, size)
  if (!firstChunk.length) {
    return array
  }
  return [firstChunk].concat(chunk(array.slice(size, array.length), size))
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESPONSE_ARRAY:
      return { ...state, responseArray: action.payload, responseChunk: chunk(action.payload, 4) }
    case QUERY_STRING:
      return { ...state, queryString: action.payload }
    case QUERY_CATEGORY:
      return { ...state, queryCategory: action.payload }
    case LOADING:
      return { ...state, loading: action.payload }
    default:
      return { ...state }
  }
}
