import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { NavigationV } from '../views/'

class NavigationC extends Component {

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