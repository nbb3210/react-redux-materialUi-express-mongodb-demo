import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { DisplaycommentV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class DisplaycommentC extends Component {

  constructor() {
    super()
    this.state = {
      comments: [],
      comment: '',
      errorTextComment: ''
    }
  }

  componentDidMount() {
    fetch(`api/photos/${this.props.displayPhoto._id}/comments`, {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {
        let updatedComments = Object.assign([], this.state.comments)
        updatedComments = data.results
        this.setState({
          comments: updatedComments
        })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    fetch(`api/photos/${this.props.displayPhoto._id}/comments`, {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {
        let updatedComments = Object.assign([], this.state.comments)
        if (updatedComments.length == 0 && data.results.length == 0) return

        if (updatedComments.length !== data.results.length) {
          updatedComments = data.results
          this.setState({
            comments: updatedComments
          })
          return
        }

        if (updatedComments[0]._id !== data.results[0]._id) {
          updatedComments = data.results
          this.setState({
            comments: updatedComments
          })
        }
      })
      .catch(err => console.log(err))
  }

  clickDetail() {
    this.props.toggleComment()
  }

  updateComment(event, value) {
    this.setState({
      comment: value
    })
  }

  submitComment() {
    if (this.state.comment == '') {
      this.setState({
        errorTextComment: '评论内容不能为空！'
      })
      return
    }

    let params = {
      profile_id: this.props.profile._id,
      profile_name: this.props.profile.username,
      photo_id: this.props.displayPhoto._id,
      content: this.state.comment
    }

    fetch('api/comments', {
      method: "post",
      body: JSON.stringify(params),
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => this.setState({
        comment: '',
        errorTextComment: ''
      }))
      .catch(err => console.log(err))

  }

  render() {
    return (
      <DisplaycommentV
        comments={this.state.comments}
        comment={this.state.comment}
        errorTextComment={this.state.errorTextComment}
        clickDetail={this.clickDetail.bind(this)}
        updateComment={this.updateComment.bind(this)}
        submitComment={this.submitComment.bind(this)} />
    )
  }
}

const stateToProps = (state) => {
  return {
    displayPhoto: state.photo.displayPhoto,
    profile: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    toggleComment: () => dispatch(actions.toggleComment())
  }
}

export default connect(stateToProps, dispatchToProps)(DisplaycommentC)