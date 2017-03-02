import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { DisplaydetailV } from '../views/'

class DisplaydetailC extends Component {

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