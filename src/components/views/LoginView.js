import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import EmailIcon from 'material-ui/svg-icons/communication/email'

class LoginView extends Component {

  constructor() {
    super()
    this.state = {
      registration: {
        username: '',
        password: ''
      }
    }
  }

  updateRegistration(event) {
    let updated = Object.assign({}, this.state.registration)
    updated[event.target.id] = event.target.value
    this.setState({
      registration: updated
    })
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Photo Sharing Demo"
          subtitle="Please use Chrome"
          />
        <CardText>
          <TextField
            hintText="Username"
            floatingLabelText="Username"
            type="text"
            onChange={this.updateRegistration.bind(this)}
            id="username"
            errorText={this.props.errorTextUser}
            /><br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.updateRegistration.bind(this)}
            id="password"
            errorText={this.props.errorTextPwd}
            />
        </CardText>
        <CardActions>
          <FlatButton
            onTouchTap={() => this.props.onLogin(this.state.registration)}
            label="LOGIN"
            />
          <FlatButton
            onTouchTap={() => this.props.onRegister(this.state.registration)}
            label="REGISTER"
            />
        </CardActions>
        <CardText>
          <IconButton iconClassName="fa fa-github" href="https://github.com/nbb3210/react-redux-materialUi-express-mongodb-demo" target="_blank"/>          
          <span>nbb3210@gmail.com</span>
        </CardText>
      </Card>
    )
  }
}

export default LoginView