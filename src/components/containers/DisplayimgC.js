import React, { Component } from 'react'
import { is } from 'immutable'
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

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    const thisProps = this.props || {}, thisState = this.state || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length) {
      return true;
    }

    for (const key in nextProps) {
      if (!is(thisProps[key], nextProps[key])) {
        return true;
      }
    }

    for (const key in nextState) {
      if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
        return true;
      }
    }
    return false
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
