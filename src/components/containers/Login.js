import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { LoginView } from '../views/'

function checkStatus(res) {
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(
      new Error(response.statusText)
    )
  }
}

function getJSON(res) {
  return res.json()
}

class Login extends Component {

  register(registration) {
    this.props.register(registration)
  }

  login(credentials) {
    // this.props.login(credentials)
    fetch('account/login', {
      "method": "post",
      "body": credentials
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <LoginView
        onRegister={this.register.bind(this)}
        onLogin={this.login.bind(this)} />
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
    register: (params) => dispatch(actions.register(params)),
    login: (params) => dispatch(actions.login(params))
  }
}



export default connect(stateToProps, dispatchToProps)(Login)