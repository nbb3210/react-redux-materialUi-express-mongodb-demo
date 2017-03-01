import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Avatar from 'material-ui/Avatar'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import CommentIcon from 'material-ui/svg-icons/communication/comment'

export default class DisplaycommentV extends Component {

  render() {
    const comments = this.props.comments

    return (
      <div style={{ flexGrow: 1, height: '100%' }}>
        <Subheader>Comments</Subheader>
        <List style={{ height: 'calc(100% - 300px)', overflowY: 'auto' }}>
          {(comments.length == 0)
            ?
            <FlatButton
              label="暂无"
              icon={<CommentIcon />}
              disabled={true}
              />
            :
            <div>
              {
                comments.map((comment, i) => {
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
            floatingLabelText="Add a comment"
            hintText="Add a comment"
            fullWidth={true}
            underlineShow={true}
            multiLine={true}
            rowsMax={5}
            rows={2}
            onChange={(event, value) => this.props.updateComment(event, value)}
            value={this.props.comment}
            errorText={this.props.errorTextComment} />
          <div>
            <FlatButton label="Send A Comment" onTouchTap={() => this.props.submitComment()} />
            <FlatButton label="Back To Detail" onTouchTap={() => this.props.clickDetail()} />
          </div>
        </div>
      </div>
    )
  }

}