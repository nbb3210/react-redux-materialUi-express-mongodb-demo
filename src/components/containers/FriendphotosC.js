import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { FriendphotosV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class FriendphotosC extends Component {

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

  componentDidMount() {
    fetch(`api/friends/${this.props.profile_id}/photos`, {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => this.props.receiveFriendphotos(data.results))
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    fetch(`api/friends/${this.props.profile_id}/photos`, {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {
        if (data.results.length !== this.props.friendPhotos.length) this.props.receiveFriendphotos(data.results)
      })
      .catch(err => console.log(err))
  }

  clickImg(photo) {
    this.props.clickPhoto(photo)
  }

  render() {
    return (
      <FriendphotosV
        photoList={this.props.friendPhotos}
        clickImg={this.clickImg.bind(this)} />
    )
  }
}

const stateToProps = (state) => {
  return {
    friendPhotos: state.photo.friendPhotos,
    profile_id: state.account.user._id
  }
}

const dispatchToProps = (dispatch) => {
  return {
    receiveFriendphotos: (photos) => dispatch(actions.receiveFriendphotos(photos)),
    clickPhoto: (photo) => dispatch(actions.clickPhoto(photo))
  }
}

export default connect(stateToProps, dispatchToProps)(FriendphotosC)