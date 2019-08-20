import axios from 'axios'

import { RESPONSE_ARRAY, QUERY_STRING, QUERY_CATEGORY, LOADING } from './types'

export const _onUpdateQuery = text => ({
  type: QUERY_STRING,
  payload: text,
})

export const _onUpdateCategory = text => ({
  type: QUERY_CATEGORY,
  payload: text,
})

export const _onResponseArray = data => ({
  type: RESPONSE_ARRAY,
  payload: data,
})

const _dispatchResponseArray = (dispatch, data) => {
  dispatch({
    type: RESPONSE_ARRAY,
    payload: data,
  })
}

const _dispatchLoading = (dispatch, bool) => {
  dispatch({
    type: LOADING,
    payload: bool,
  })
}

let delayCall = null

export const _onSearch = (searchText, searchCategory) => dispatch => {
  clearTimeout(delayCall)
  delayCall =
    searchText &&
    searchText.length > 0 &&
    setTimeout(() => {
      _dispatchLoading(dispatch, true)
      axios
        .get(
          `https://itunes.apple.com/search?term=${searchText}&media=${searchCategory}&origin=*&limit=200`,
        )
        .then(res => {
          const result = res.data.results
          res && _dispatchResponseArray(dispatch, result)
          res && _dispatchLoading(dispatch, false)
        })
        .catch(error => {
          console.log(error)
          _dispatchLoading(dispatch, false)
        })
    }, 400)
}
