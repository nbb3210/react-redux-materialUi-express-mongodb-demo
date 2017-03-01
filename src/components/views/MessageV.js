import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

export default class MessageV extends Component {

  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={3000}
        onRequestClose={() => this.props.messageClose()}       
        />
    )
  }

}