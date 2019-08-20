import { SAVED_ITEMS, SAVED_ITEMS_NEW, SAVED_ITEMS_DELETE } from './types'

export const _onRetreiveSavedFavorites = text => ({
  type: SAVED_ITEMS,
  payload: text,
})

export const _onAddNewFavorite = object => ({
  type: SAVED_ITEMS_NEW,
  payload: object,
})

export const _onDeleteFavorite = object => ({
  type: SAVED_ITEMS_DELETE,
  payload: object,
})
