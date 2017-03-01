import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { LoginV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class LoginC extends Component {

  constructor() {
    super()
    this.state = {
      errorTextUser: '',
      errorTextPwd: ''
    }
  }

  register(registration) {

    if (registration.username == '') {
      this.setState({ errorTextUser: 'Username cannot be empty!' })
      return
    } else {
      this.setState({ errorTextUser: '' })
    }
    if (registration.password == '') {
      this.setState({ errorTextPwd: 'Password cannot be empty!' })
      return
    } else {
      this.setState({ errorTextPwd: '' })
    }

    fetch('account/register', {
      method: "post",
      body: JSON.stringify(registration),
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {
        if (data.user) this.props.updateUser(data.user)
        if (data.message) this.setState({ errorTextUser: 'Username has been used!' })
      })
      .catch(err => console.log(err))

  }

  login(registration) {

    if (registration.username == '') {
      this.setState({ errorTextUser: 'Username cannot be empty!' })
      return
    } else {
      this.setState({ errorTextUser: '' })
    }
    if (registration.password == '') {
      this.setState({ errorTextPwd: 'Password cannot be empty!' })
      return
    } else {
      this.setState({ errorTextPwd: '' })
    }

    fetch('account/login', {
      method: "post",
      body: JSON.stringify(registration),
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {        
        if (data.user) {
          this.props.updateUser(data.user)
          return
        }
        if (data.message) {
          if (data.message == 'Wrong Username!') this.setState({ errorTextUser: 'Wrong Username or You have not registered!' })
          if (data.message == 'Wrong Password!') this.setState({ errorTextPwd: 'Wrong Password!' })
          return
        }
      })
      .catch(err => console.log(err))

  }

  render() {
    return (
      <LoginV
        onRegister={this.register.bind(this)}
        onLogin={this.login.bind(this)}
        errorTextUser={this.state.errorTextUser}
        errorTextPwd={this.state.errorTextPwd}
        />
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
    updateUser: (user) => dispatch(actions.updateUser(user))
  }
}

export default connect(stateToProps, dispatchToProps)(LoginC)