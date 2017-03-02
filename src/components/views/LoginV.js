import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

const LoginV = (props) => (
  <Card>
    <CardHeader
      title="照片分享"
      subtitle="请使用Chrome"
      />
    <CardText>
      <TextField
        hintText="账号"
        floatingLabelText="账号"
        type="text"
        onChange={(event, value) => props.updateRegistration(event, value)}
        id="username"
        errorText={props.errorTextUser}
        /><br />
      <TextField
        hintText="密码"
        floatingLabelText="密码"
        type="password"
        onChange={(event, value) => props.updateRegistration(event, value)}
        id="password"
        errorText={props.errorTextPwd}
        />
    </CardText>
    <CardActions>
      <FlatButton
        onTouchTap={() => props.onLogin()}
        label="登录"
        />
      <FlatButton
        onTouchTap={() => props.onRegister()}
        label="注册"
        />
    </CardActions>
    <CardText>
      <IconButton iconClassName="fa fa-github" href="https://github.com/nbb3210/react-redux-materialUi-express-mongodb-demo" target="_blank" />
      <span>nbb3210@gmail.com</span>
    </CardText>
  </Card>
)

export default LoginV