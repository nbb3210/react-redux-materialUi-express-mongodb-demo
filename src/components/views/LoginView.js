import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

class LoginView extends Component {

  constructor() {
    super()
    this.state = {
      registration: {
        username: '',
        password: ''
      },
      errorTextUser: '',
      errorTextPwd: ''
    }
  }

  updateRegistration(event) {
    let updated = Object.assign({}, this.state.registration)
    updated[event.target.id] = event.target.value
    this.setState({
      registration: updated
    })
  }

  submitLoginCredentials(event) {
    event.preventDefault()

    this.setState({
      errorTextUser: (this.state.registration.username.length == 0) ? 'Please Check Your Username !' : ''
    })

    this.setState({
      errorTextPwd: (this.state.registration.password.length == 0) ? 'Please Check Your Password !' : ''
    })

    if ((this.state.errorTextUser != '') && (this.state.errorTextPwd != '')) {
      return
    }

    this.props.onLogin(this.state.registration)
  }

  submitRegistration(event) {
    event.preventDefault()

    this.setState({
      errorTextUser: (this.state.registration.username.length == 0) ? 'Please Check Your Username !' : ''
    })

    this.setState({
      errorTextPwd: (this.state.registration.password.length == 0) ? 'Please Check Your Password !' : ''
    })

    if ((this.state.errorTextUser != '') && (this.state.errorTextPwd != '')) {
      return
    }

    this.props.onRegister(this.state.registration)
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Photo Sharing Demo"
          subtitle="Only Support Chrome"
          />
        <CardText>
          <TextField
            hintText="Username"
            floatingLabelText="Username"
            type="text"
            onChange={this.updateRegistration.bind(this)}
            id="username"
            errorText={this.state.errorTextUser}
            /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.updateRegistration.bind(this)}
            id="password"
            errorText={this.state.errorTextPwd}
            />
        </CardText>
        <CardActions>
          <FlatButton
            onTouchTap={this.submitLoginCredentials.bind(this)}
            label="LOGIN"
            />
          <FlatButton
            onTouchTap={this.submitRegistration.bind(this)}
            label="REGISTER"
            />
        </CardActions>
      </Card>
    )
  }
}

export default LoginView