import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { NavigationV } from '../views/'

class NavigationC extends Component {

  clickHome() {
    this.props.destoryDisplay()
  }

  clickBefore() {
    let photoList = (this.props.photoListType == 1) ? this.props.friendPhotos : this.props.myPhotos
    let currentIndex = photoList.findIndex(ele => ele.public_id == this.props.displayPhoto.public_id)
    let beforeIndex = (currentIndex == 0) ? (photoList.length - 1) : (currentIndex - 1)
    this.props.clickPhoto(photoList[beforeIndex])
  }

  clickNext() {
    let photoList = (this.props.photoListType == 1) ? this.props.friendPhotos : this.props.myPhotos
    let currentIndex = photoList.findIndex(ele => ele.public_id == this.props.displayPhoto.public_id)
    let nextIndx = (currentIndex == (photoList.length - 1)) ? 0 : (currentIndex + 1)
    this.props.clickPhoto(photoList[nextIndx])
  }

  render() {
    return (
      <NavigationV
        clickHome={this.clickHome.bind(this)}
        clickBefore={this.clickBefore.bind(this)}
        clickNext={this.clickNext.bind(this)}
        />
    )
  }

}

const stateToProps = (state) => {
  return {
    displayPhoto: state.photo.displayPhoto,
    photoListType: state.photo.photoListType,
    myPhotos: state.photo.myPhotos,
    friendPhotos: state.photo.friendPhotos
  }
}

const dispatchToProps = (dispatch) => {
  return {
    destoryDisplay: () => dispatch(actions.destoryDisplay()),
    clickPhoto: (photo) => dispatch(actions.clickPhoto(photo))
  }
}

export default connect(stateToProps, dispatchToProps)(NavigationC)