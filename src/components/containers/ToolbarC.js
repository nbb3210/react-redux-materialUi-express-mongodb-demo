import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { ToolbarV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class ToolbarC extends Component {

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

  changeDropDownMenuValue(event, index, value) {
    this.props.changePhotoListType(value)
  }

  clickFlatButton() {
    this.props.changePhotoListType(3)
  }

  clickRasiedButton() {
    this.props.toggleUpload()
  }

  leave() {
    fetch('account/logout', {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => this.props.logout())
      .catch(err => console.log(err))
  }

  render() {
    return (
      <ToolbarV
        dropDownMenuValue={this.props.photoListType}
        menuItemTwoText={this.props.username + "的照片"}
        flatButtonLabel={(this.props.uploadingPhotos.length == 0) ? "木有照片在" : `${this.props.uploadingPhotos.length}张照片在`}
        flatButtonDisabled={(this.props.uploadingPhotos.length == 0) ? true : false}
        changeDropDownMenuValue={this.changeDropDownMenuValue.bind(this)}
        clickFlatButton={this.clickFlatButton.bind(this)}
        clickRasiedButton={this.clickRasiedButton.bind(this)}
        leave={this.leave.bind(this)} />
    )
  }

}

const stateToProps = (state) => {
  return {
    username: state.account.user.username,
    photoListType: state.photo.photoListType,
    uploadingPhotos: state.photo.uploadingPhotos
  }
}

const dispatchToProps = (dispatch) => {
  return {
    changePhotoListType: (photoListType) => dispatch(actions.changePhotoListType(photoListType)),
    toggleUpload: () => dispatch(actions.toggleUpload()),
    logout: () => dispatch(actions.logout()),
  }
}

export default connect(stateToProps, dispatchToProps)(ToolbarC)