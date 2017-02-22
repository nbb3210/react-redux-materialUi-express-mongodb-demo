import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { LoginView } from '../views/'

class Login extends Component {

  register(registration) {
    this.props.register(registration)
  }

  login(credentials) {
    this.props.login(credentials)
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