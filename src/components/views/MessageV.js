import React from 'react'
import Snackbar from 'material-ui/Snackbar'

const MessageV = (props) => (
  <Snackbar
    open={props.open}
    message={props.message}
    autoHideDuration={3000}
    onRequestClose={() => props.messageClose()}
    />
)

export default MessageV