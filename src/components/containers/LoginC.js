import React, { Component } from 'react'
import { is } from 'immutable'
import { connect } from 'react-redux'
import actions from '../../actions'
import { LoginV } from '../views/'
import { checkStatus, getJSON } from '../../utils'

class LoginC extends Component {

  constructor() {
    super()
    this.state = {
      errorTextUser: '',
      errorTextPwd: '',
      registration: {
        username: '',
        password: ''
      }
    }
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

  register() {
    if (this.state.registration.username == '') {
      this.setState({ errorTextUser: '账号不能为空!' })
      return
    } else {
      this.setState({ errorTextUser: '' })
    }
    if (this.state.registration.password == '') {
      this.setState({ errorTextPwd: '密码不能为空!' })
      return
    } else {
      this.setState({ errorTextPwd: '' })
    }

    fetch('account/register', {
      method: "post",
      body: JSON.stringify(this.state.registration),
      headers: { "Content-Type": "application/json" },
      mode: 'cors',
      credentials: 'include'
    })
      .then(checkStatus)
      .then(getJSON)
      .then(data => {
        if (data.user) this.props.updateUser(data.user)
        if (data.message) this.setState({ errorTextUser: '该账号已被使用!' })
      })
      .catch(err => console.log(err))

  }

  login() {

    if (this.state.registration.username == '') {
      this.setState({ errorTextUser: '账号不能为空!' })
      return
    } else {
      this.setState({ errorTextUser: '' })
    }
    if (this.state.registration.password == '') {
      this.setState({ errorTextPwd: '密码不能为空!' })
      return
    } else {
      this.setState({ errorTextPwd: '' })
    }

    fetch('account/login', {
      method: "post",
      body: JSON.stringify(this.state.registration),
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
          if (data.message == 'Wrong Username!') this.setState({ errorTextUser: '该账号不存在!' })
          if (data.message == 'Wrong Password!') this.setState({ errorTextPwd: '密码错误!' })
          return
        }
      })
      .catch(err => console.log(err))

  }

  updateRegistration(event, value) {
    let updated = Object.assign({}, this.state.registration)
    updated[event.target.id] = event.target.value    
    this.setState({
      registration: updated
    })
  }

  render() {
    return (
      <LoginV
        onRegister={this.register.bind(this)}
        onLogin={this.login.bind(this)}
        updateRegistration={this.updateRegistration.bind(this)}
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