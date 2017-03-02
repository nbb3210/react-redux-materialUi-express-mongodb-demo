import React from 'react'
import Dialog from 'material-ui/Dialog'
import Dropzone from 'react-dropzone'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const UploadV = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={() => props.cancelUpload()}
      />,
    <FlatButton
      label="Submit"
      primary={true}
      keyboardFocused={true}
      onTouchTap={() => props.submitUpload()}
      />
  ]

  return (
    <Dialog
      style={{ paddingTop: 0 }}
      titleStyle={{ borderBottom: 0 }}
      actionsContainerStyle={{ borderTop: 0 }}
      repositionOnUpdate={false}
      title="上传照片"
      actions={actions}
      modal={true}
      open={props.uploadOpen}
      autoScrollBodyContent={true}
      >
      <Dropzone style={{ border: 'none' }}
        multiple={false}
        onDrop={(photos) => props.selectPhoto(photos)}>
        <RaisedButton label="选择照片" primary={true} fullWidth={true} />
      </Dropzone>
      <Divider />
      <TextField
        id="name"
        hintText="照片名称"
        errorText={props.errorTextName}
        underlineShow={false}
        onChange={(event, value) => props.updatePhoto(event, value)} />
      <Divider />
      <TextField
        id="caption"
        hintText="照片描述"
        errorText={props.errorTextCaption}
        underlineShow={false}
        multiLine={true}
        rows={3}
        onChange={(event, value) => props.updatePhoto(event, value)} />
      <Divider />
      {(props.preview)
        &&
        <img style={{ width: '100%' }} src={props.preview} />
      }
    </Dialog>
  )
}

export default UploadV