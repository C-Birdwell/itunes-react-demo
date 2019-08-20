import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import Fade from 'react-reveal/Fade'

import { _onResponseArray, _onAddNewFavorite, _onRetreiveSavedFavorites } from '../actions'

export class FavoritesPage extends React.Component {
  constructor(...props) {
    super(...props)
    this._onDeleteFavorite = this._onDeleteFavorite.bind(this)
  }

  componentDidMount() {
    const { _onRetreiveSavedFavorites } = this.props
    //localStorage.clear()
    //For Retrieving saved items
    const getSavedItems = JSON.parse(localStorage.getItem('savedArray'))

    _onRetreiveSavedFavorites(getSavedItems === null ? [] : getSavedItems)
  }

  componentDidUpdate() {
    const { savedAddItem } = this.props
  }

  _onDeleteFavorite(card) {
    const { _onAddNewFavorite, savedArray, _onRetreiveSavedFavorites } = this.props
    let newArray = savedArray
    newArray = newArray.filter(val => val !== card)
    const format = JSON.stringify(newArray)
    localStorage.setItem('savedArray', format)
    _onRetreiveSavedFavorites(newArray)
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
    const { savedChunk, savedArray } = this.props

    if (savedArray) {
      return (
        <div>
          {savedChunk.map((block, i) => {
            const delayRow = i * 10
            return (
              <div className="row card-row" key={i}>
                {block.map((card, i) => (
                  <Fade
                    bottom
                    duration={1250}
                    key={i + card.trackName + savedArray.length}
                    delay={i * 100 + delayRow}
                  >
                    <div className="card-container">
                      <div className="col-2">
                        <div className="col-2">
                          <LazyLoad>
                            <img src={card.artworkUrl100} />
                          </LazyLoad>
                        </div>
                        <div className="col-1">
                          <p>{card.trackName}</p>
                        </div>
                      </div>
                      <div className="col-2">
                        <p>{card.primaryGenreName}</p>
                        <a href={card.collectionViewUrl} target="_blank" className="view-button">
                          View
                        </a>
                      </div>
                      <div className="col-1">
                        <div className="button-delete" onClick={() => this._onDeleteFavorite(card)}>
                          <FontAwesomeIcon icon={faMinusCircle} />
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
    return <div className="content-container">{this.renderCard()}</div>
  }
}

const mapStateToProps = state => ({
  loading: state.response.loading,
  savedAddItem: state.favorite.savedAddItem,
  savedArray: state.favorite.savedArray,
  savedChunk: state.favorite.savedChunk,
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
)(FavoritesPage)
