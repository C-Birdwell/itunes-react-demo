import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFilm,
  faPodcast,
  faMusic,
  faBook,
  faListUl,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { _onSearch, _onUpdateQuery, _onUpdateCategory, _onResponseArray } from '../actions'
import Fade from 'react-reveal/Fade'

export class SearchBar extends React.Component {
  constructor(...props) {
    super(...props)
    this._querySearch = this._querySearch.bind(this)
  }

  _querySearch(val) {
    const { _onUpdateQuery, _onSearch, _onResponseArray, queryCategory, queryString } = this.props

    val.length > 0 ? _onSearch(val, queryCategory) : _onResponseArray(false)
  }

  searchCategories(category, icon, delay) {
    const { _onUpdateCategory, _onSearch, queryString, queryCategory } = this.props

    const isActivated = queryCategory === category ? 'category-button activated' : 'category-button'

    return (
      <Fade right duration={1200} delay={delay}>
        <div
          className="col-1"
          onClick={() => {
            _onUpdateCategory(category), _onSearch(queryString, category)
          }}
        >
          <div className={isActivated}>
            <FontAwesomeIcon icon={icon} size="lg" />
            <p>{category}</p>
          </div>
        </div>
      </Fade>
    )
  }

  categoryRow() {
    return (
      <div className="row" style={{ padding: '0 5%' }}>
        {this.searchCategories('all', faListUl, 0)}
        {this.searchCategories('movie', faFilm, 100)}
        {this.searchCategories('podcast', faPodcast, 200)}
        {this.searchCategories('music', faMusic, 300)}
        {this.searchCategories('audiobook', faBook, 400)}
      </div>
    )
  }

  renderSearchBar() {
    const { queryString, _onResponseArray, loading, _onUpdateQuery } = this.props

    return (
      <Fade>
        <div className="row search-bar-container">
          <div className="col-1">
            <div className="search-icon-wrapper">
              <FontAwesomeIcon icon={faSearch} size="lg" className="search-icon" />
            </div>
          </div>
          <div className="col-9">
            <input
              value={queryString}
              onChange={event => {
                _onUpdateQuery(event.target.value),
                  event.target.value.length > 0 && this._querySearch(event.target.value)
              }}
              onKeyUp={event => {
                event.keyCode === 8 &&
                  queryString.length === 0 &&
                  setTimeout(() => {
                    _onResponseArray([])
                  }, 1000)
              }}
              onKeyDown={event => {
                event.keyCode === 8 &&
                  queryString.length === 1 &&
                  setTimeout(() => {
                    _onResponseArray([])
                  }, 1000)
              }}
              className="search-input"
            />
          </div>
        </div>
      </Fade>
    )
  }

  renderSearch() {
    return (
      <div className="search-wrapper">
        {this.renderSearchBar()}
        {this.categoryRow()}
      </div>
    )
  }

  render() {
    return <div className="search-container">{this.renderSearch()}</div>
  }
}

const mapStateToProps = state => ({
  loading: state.response.loading,
  queryString: state.response.queryString,
  queryCategory: state.response.queryCategory,
  responseArray: state.response.responseArray,
  responseChunk: state.response.responseChunk,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      _onSearch,
      _onUpdateQuery,
      _onResponseArray,
      _onUpdateCategory,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar)
