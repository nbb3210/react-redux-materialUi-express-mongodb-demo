import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { MyphotosV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class MyphotosC extends Component {

  componentDidMount() {
    fetch(`api/profiles/${this.props.profile_id}/photos`, {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => this.props.receiveMyphotos(data.results))
      .catch(err => console.log(err))
  }

  clickImg(photo) {
    this.props.clickPhoto(photo)
  }

  addImg() {
    this.props.toggleUpload()
  }

  deletePhoto(photo_id) {
    fetch(`api/photos/${photo_id}`, {
      method: "delete",
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => this.props.removeMyphoto(photo_id))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <MyphotosV
        photoList={this.props.myPhotos}
        clickImg={this.clickImg.bind(this)}
        addImg={this.addImg.bind(this)}
        deletePhoto={this.deletePhoto.bind(this)} />
    )
  }
}

const stateToProps = (state) => {
  return {
    myPhotos: state.photo.myPhotos,
    profile_id: state.account.user._id
  }
}

const dispatchToProps = (dispatch) => {
  return {
    receiveMyphotos: (photos) => dispatch(actions.receiveMyphotos(photos)),
    clickPhoto: (photo) => dispatch(actions.clickPhoto(photo)),
    removeMyphoto: (photo_id) => dispatch(actions.removeMyphoto(photo_id)),
    toggleUpload: () => dispatch(actions.toggleUpload()),
  }
}

export default connect(stateToProps, dispatchToProps)(MyphotosC)