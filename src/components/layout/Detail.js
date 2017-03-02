import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { NavigationC, DisplayimgC, DisplaydetailC, DisplaycommentC } from '../containers'
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    flexGrow: 1,
    height: '100%'
  },
  container: {
    height: 'calc(100% - 56px)',
    width: '100%',
    display: 'flex'
  }
}

class Detail extends Component {

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
  
  render() {
    return (
      <Paper style={styles.root} zDepth={5}>
        <NavigationC />
        <div style={styles.container}>
          <DisplayimgC />
          {(this.props.displayDetail)
            ?
            <DisplaydetailC />
            :
            <DisplaycommentC />
          }
        </div>
      </Paper>
    )
  }

}

const stateToProps = (state) => {
  return {
    displayDetail: state.photo.displayDetail
  }
}

const dispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(stateToProps, dispatchToProps)(Detail)