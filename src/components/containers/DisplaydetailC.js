import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { DisplaydetailV } from '../views/'

class DisplaydetailC extends Component {

  clickComments() {
    this.props.toggleComment()
  }

  render() {
    return (
      <DisplaydetailV
        photo={this.props.displayPhoto}
        clickComments={this.clickComments.bind(this)} />
    )
  }

}

const stateToProps = (state) => {
  return {
    displayPhoto: state.photo.displayPhoto
  }
}

const dispatchToProps = (dispatch) => {
  return {
    toggleComment: () => dispatch(actions.toggleComment())
  }
}

export default connect(stateToProps, dispatchToProps)(DisplaydetailC)