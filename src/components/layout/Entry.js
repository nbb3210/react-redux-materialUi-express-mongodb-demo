import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import Home from './Home'
import { LoginC } from '../containers/'
import { checkStatus, getJSON } from '../../utils'

const styles = {
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'space-around'
  },
  login: {
    alignSelf: 'center'
  }
}

class Entry extends Component {

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    fetch('account/user', {
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {
        if (data.user) this.props.updateUser(data.user)
      })
      .catch(err => console.log(err))
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
      <div style={styles.root}>
        {(this.props.user)
          ?
          <Home />
          :
          <div style={styles.login}>
            <LoginC />
          </div>
        }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.account.user
  }
}

const dispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(actions.updateUser(user))
  }
}

export default connect(stateToProps, dispatchToProps)(Entry)