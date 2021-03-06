import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import SearchBar from './SearchBar'
import Fade from 'react-reveal/Fade'
import LoadingGraphic from '../components/LoadingGraphic'

import { _onResponseArray, _onAddNewFavorite, _onRetreiveSavedFavorites } from '../actions'

//For Retrieving saved items
const getSavedItems = JSON.parse(localStorage.getItem('savedArray'))

export class DashboardPage extends React.Component {
  constructor(...props) {
    super(...props)
    this._onSelectFavorite = this._onSelectFavorite.bind(this)
  }

  componentDidMount() {
    const { _onRetreiveSavedFavorites } = this.props
    //localStorage.clear()
    //For Retrieving saved items
    _onRetreiveSavedFavorites(getSavedItems === null ? [] : getSavedItems)
  }

  componentDidUpdate() {
    const { savedAddItem } = this.props
  }

  _onSelectFavorite(card) {
    const { _onAddNewFavorite, savedArray, _onRetreiveSavedFavorites } = this.props
    let newArray = savedArray
    newArray.push(card)
    const format = JSON.stringify(newArray)
    localStorage.setItem('savedArray', format)
    _onRetreiveSavedFavorites(newArray)
    _onAddNewFavorite(card)
  }

  renderEmptyColumns(val) {
    let fillArray = []
    const emptyCol = i => <div className="col-1 empty-card" key={i} />
    for (let i = val; i < 4; i++) {
      fillArray.push(emptyCol(i))
    }
    return fillArray
  }

  renderCard() {
    const { responseArray, responseChunk } = this.props

    if (responseArray) {
      return (
        <div>
          {responseChunk.map((block, i) => {
            const delayRow = i * 10
            return (
              <div className="row card-row" key={i}>
                {block.map((card, i) => (
                  <Fade
                    bottom
                    duration={1250}
                    key={i + card.trackName + responseArray.length}
                    delay={i * 100 + delayRow}
                  >
                    <div key={i} className="card-container">
                      <div className="col-2">
                        <div className="col-2">
                          <LazyLoad>
                            <img src={card.artworkUrl100} />
                          </LazyLoad>
                        </div>
                        <div className="col-1">
                          <p>
                            {card.trackName && card.trackName.length > 30
                              ? `${card.trackName.slice(0, 30)}...`
                              : card.trackName}
                          </p>
                        </div>
                      </div>
                      <div className="col-2">
                        <p>{card.primaryGenreName}</p>
                        <a href={card.collectionViewUrl} target="_blank" className="view-button">
                          View
                        </a>
                      </div>
                      <div className="col-1">
                        <div className="button-plus" onClick={() => this._onSelectFavorite(card)}>
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </div>
                      </div>
                    </div>
                  </Fade>
                ))}

                {block.length < 5 && this.renderEmptyColumns(block.length).map(blank => blank)}
              </div>
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    const { loading } = this.props
    return (
      <div className="content-container">
        <div className="search-container">
          <SearchBar />
        </div>
        <div className="row">
          <div className="col-1" style={{ position: 'relative' }}>
            {this.renderCard()}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.response.loading,
  responseArray: state.response.responseArray,
  responseChunk: state.response.responseChunk,
  savedAddItem: state.favorite.savedAddItem,
  savedArray: state.favorite.savedArray,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      _onResponseArray,
      _onAddNewFavorite,
      _onRetreiveSavedFavorites,
    },
    dispatch,
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage)
