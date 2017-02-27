import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Login } from '../containers/'
import Home from './Home'

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
    // this.props.checkCurrentUser()
    fetch('account/currentuser')
      .then(checkStatus)
      .then(getJSON)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render() {
    const currentUser = this.props.account.user

    return (
      <div style={styles.root}>
        {(currentUser == null) ?
          <div style={styles.login}>
            <Login />
          </div> :
          <Home />
        }
      </div>
    )
  }
}

const stateToProps = (state) => {
  return {
    account: state.account
  }
}

const dispatchToProps = (dispatch) => {
  return {
    checkCurrentUser: () => dispatch(actions.checkCurrentUser())
  }
}

export default connect(stateToProps, dispatchToProps)(Entry)