import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import CommentIcon from 'material-ui/svg-icons/communication/comment'

const DisplaycommentV = (props) => (
  <div style={{ flexGrow: 1, height: '100%' }}>
    <Subheader>评论列表</Subheader>
    <List style={{ height: 'calc(100% - 300px)', overflowY: 'auto' }}>
      {(props.comments.length == 0)
        ?
        <FlatButton
          label="暂无"
          icon={<CommentIcon />}
          disabled={true}
          />
        :
        <div>
          {
            props.comments.map((comment, i) => {
              return (
                <div key={i}>
                  <ListItem
                    leftAvatar={<Avatar src="images/jsa-128.jpg" />}
                    primaryText={comment.profile_name}
                    secondaryText={
                      <p>{comment.content}</p>
                    }
                    secondaryTextLines={2}
                    />
                  <Divider inset={true} />
                </div>
              )
            })
          }
        </div>
      }
    </List>
    <div style={{ padding: 20 }}>
      <Divider />
      <TextField
        floatingLabelText="添加评论"
        hintText="添加评论"
        fullWidth={true}
        underlineShow={true}
        multiLine={true}
        rowsMax={5}
        rows={2}
        onChange={(event, value) => props.updateComment(event, value)}
        value={props.comment}
        errorText={props.errorTextComment} />
      <div>
        <FlatButton label="发送评论" onTouchTap={() => props.submitComment()} />
        <FlatButton label="返回简介" onTouchTap={() => props.clickDetail()} />
      </div>
    </div>
  </div>
)

export default DisplaycommentV