import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { MessageV } from '../views/'

class MessageC extends Component {

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