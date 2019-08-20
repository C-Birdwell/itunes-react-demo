import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export class LoadingGraphic extends React.Component {
  constructor(...props) {
    super(...props)
  }

  renderLoading() {
    const { loading } = this.props

    if (loading) {
      return (
        <div className="loading-container">
          <FontAwesomeIcon icon={faSpinner} spin placeholder size="5x" />
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return this.renderLoading()
  }
}

const mapStateToProps = state => ({
  loading: state.response.loading,
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingGraphic)
