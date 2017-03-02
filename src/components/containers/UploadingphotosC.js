import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { UploadingphotosV } from '../views/'

class UploadingphotosC extends Component {

  constructor() {
    super()
    this.state = {}
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

  render() {
    return (
     <UploadingphotosV photoList={this.props.uploadingPhotos}/>
    )
  }

}

const stateToProps = (state) => {
  return {
    uploadingPhotos: state.photo.uploadingPhotos
  }
}

const dispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(UploadingphotosC)