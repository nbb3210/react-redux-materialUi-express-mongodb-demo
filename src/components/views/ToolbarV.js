import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import LeaveIcon from 'material-ui/svg-icons/maps/directions-run'
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload'

export default class ToolbarV extends Component {

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu
            value={this.props.dropDownMenuValue}
            onChange={(event, index, value) => this.props.changeDropDownMenuValue(event, index, value)}>
            <MenuItem value={1} primaryText={"朋友的皂片"} />
            <MenuItem value={2} primaryText={this.props.menuItemTwoText} />
            <MenuItem value={3} primaryText={"正在上传的皂片"} />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            label={this.props.flatButtonLabel}
            labelPosition="before"
            primary={true}
            disabled={this.props.flatButtonDisabled}
            icon={<CloudUploadIcon />}
            onTouchTap={() => this.props.clickFlatButton()}
            />
          <ToolbarSeparator />
          <RaisedButton label="上传皂片" primary={true}
            onTouchTap={() => this.props.clickRasiedButton()} />
          <IconButton
            tooltip="Leave"
            onTouchTap={() => this.props.leave()}>
            <LeaveIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
    )
  }

}