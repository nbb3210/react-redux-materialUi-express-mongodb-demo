import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { FriendphotosV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class FriendphotosC extends Component {

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