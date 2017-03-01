import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { UploadingphotosV } from '../views/'

class UploadingphotosC extends Component {

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