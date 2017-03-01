import React, { Component } from 'react'
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