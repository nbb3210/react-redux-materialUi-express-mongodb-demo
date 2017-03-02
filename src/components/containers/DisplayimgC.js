import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { DisplayimgV } from '../views/'

class DisplayimgC extends Component {

  constructor() {
    super()
    this.state = {
      lightboxOpen: false
    }
  }

  toggleLightbox() {
    this.setState({
      lightboxOpen: !this.state.lightboxOpen
    })
  }

  render() {
    return (
      <DisplayimgV
        photo={this.props.displayPhoto}
        lightboxOpen={this.state.lightboxOpen}
        openLightbox={this.toggleLightbox.bind(this)}
        closeLightbox={this.toggleLightbox.bind(this)} />
    )
  }

}

const stateToProps = (state) => {
  return {
    displayPhoto: state.photo.displayPhoto
  }
}

const dispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(stateToProps, dispatchToProps)(DisplayimgC)
