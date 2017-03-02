import React from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import LeaveIcon from 'material-ui/svg-icons/maps/directions-run'
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload'

const ToolbarV  = (props) => (
  <Toolbar>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu
            value={props.dropDownMenuValue}
            onChange={(event, index, value) => props.changeDropDownMenuValue(event, index, value)}>
            <MenuItem value={1} primaryText={"朋友的照片"} />
            <MenuItem value={2} primaryText={props.menuItemTwoText} />
            <MenuItem value={3} primaryText={"正在上传的照片"} />
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <FlatButton
            label={props.flatButtonLabel}
            labelPosition="before"
            primary={true}
            disabled={props.flatButtonDisabled}
            icon={<CloudUploadIcon />}
            onTouchTap={() => props.clickFlatButton()}
            />
          <ToolbarSeparator />
          <RaisedButton label="上传照片" primary={true}
            onTouchTap={() => props.clickRasiedButton()} />
          <IconButton
            tooltip="离开"
            onTouchTap={() => props.leave()}>
            <LeaveIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
)

export default ToolbarV