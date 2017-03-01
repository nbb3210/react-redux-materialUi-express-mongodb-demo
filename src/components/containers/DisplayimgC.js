import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { DisplayimgV } from '../views/'

class DisplayimgC extends Component {

  render() {
    return (
      <DisplayimgV
        photo={this.props.displayPhoto}
        />
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
    
  }
}

export default connect(stateToProps, dispatchToProps)(DisplayimgC)
