import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { MessageV } from '../views/'

class MessageC extends Component {

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

  messageClose(){
    this.props.closeMessage()
  }

  render() {
    return (
      <MessageV
        open={this.props.open}
        message={this.props.message}
        messageClose={this.messageClose.bind(this)}
        />
    )
  }

}

const stateToProps = (state) => {
  return {
    open: state.photo.messageOpen,
    message: state.photo.message
  }
}

const dispatchToProps = (dispatch) => {
  return {
    closeMessage: () => dispatch(actions.closeMessage())
  }
}

export default connect(stateToProps, dispatchToProps)(MessageC)