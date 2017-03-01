import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import Dropzone from 'react-dropzone'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

export default class UploadV extends Component {

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.props.cancelUpload()}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => this.props.submitUpload()}
        />
    ]

    return (
      <Dialog
        style={{ paddingTop: 0 }}
        titleStyle={{ borderBottom: 0 }}
        actionsContainerStyle={{ borderTop: 0 }}
        repositionOnUpdate={false}
        title="上传皂片"
        actions={actions}
        modal={true}
        open={this.props.uploadOpen}
        autoScrollBodyContent={true}
        >
        <Dropzone style={{ border: 'none' }}
          multiple={false}
          onDrop={(photos) => this.props.selectPhoto(photos)}>
          <RaisedButton label="选择皂片" primary={true} fullWidth={true} />
        </Dropzone>
        <Divider />
        <TextField
          id="name"
          hintText="皂片名称"
          errorText={this.props.errorTextName}
          underlineShow={false}
          onChange={(event, value) => this.props.updatePhoto(event, value)} />
        <Divider />
        <TextField
          id="caption"
          hintText="皂片描述"
          errorText={this.props.errorTextCaption}
          underlineShow={false}
          multiLine={true}
          rows={3}
          onChange={(event, value) => this.props.updatePhoto(event, value)} />
        <Divider />
        {(this.props.preview)
          &&
          <img style={{ width: '100%' }} src={this.props.preview} />
        }
      </Dialog>
    )
  }

}