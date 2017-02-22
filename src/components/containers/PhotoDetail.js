import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { blue500, grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Dialog from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import CommentIcon from 'material-ui/svg-icons/communication/comment'
import Snackbar from 'material-ui/Snackbar'
import { APIManager } from '../../utils'
import ImageZoom from 'react-medium-image-zoom'
import Lightbox from 'react-image-lightbox'

const styles = {
  root: {
    height: 'calc(100% - 56px)',
    width: '100%',
    display: 'flex'
  },
  photoContainer: {
    height: '100%'
  },
  photoImg: {
    height: '100%'
  },
  zoomImage: {
    height: '1000px'
  },
  photodetail: {
    flexGrow: 1,
    height: '100%'
  },
  photoCard: {
    height: '100%'
  },
  cardContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardActions: {
    alignSelf: 'flex-end'
  },
  textFieldContainer: {
    padding: '20px'
  },
  commentsList: {
    height: 'calc(100% - 300px)',
    overflowY: 'auto'
  }
}

class PhotoDetail extends Component {

  constructor() {
    super()
    this.state = {
      dialogOpen: false,
      commentsOpen: false,
      snackbarOpen: false,
      lightboxOpen: false,
      comment: '',
      comments: [],
      photo_id: ''
    }
  }

  componentDidMount() {
    let url = '/api/comment'
    let params = {
      photo_id: this.props.photo._id
    }
    this.setState({ photo_id: this.props.photo._id })
    APIManager.get(url, params)
      .then(res => {
        let updatedComments = Object.assign([], this.state.comments)
        updatedComments = res.results
        this.setState({ comments: updatedComments })
      })
      .catch((err) => {
        console.log('ERROR IN COMPONENTDIDMOUNT: ' + err)
      })
  }

  componentDidUpdate() {
    if (this.props.photo._id != this.state.photo_id) {
      let url = '/api/comment'
      let params = {
        photo_id: this.props.photo._id
      }
      this.setState({ photo_id: this.props.photo._id })
      APIManager.get(url, params)
        .then(res => {
          let updatedComments = Object.assign([], this.state.comments)
          updatedComments = res.results
          this.setState({ comments: updatedComments })
        })
        .catch((err) => {
          console.log('ERROR IN COMPONENTDIDMOUNT: ' + err)
        })
    }
  }

  handleCommentsToggle() {
    this.setState({ commentsOpen: !this.state.commentsOpen })
  }

  handleContentUpdate(event, value) {
    this.setState({ comment: value })
  }

  handleCommentSend() {
    if (this.state.comment == "") {
      this.setState({ dialogOpen: true })
      return
    }
    let url = '/api/comment'
    let updatedComment = {}
    updatedComment['profile_id'] = this.props.account.user._id
    updatedComment['profile_name'] = this.props.account.user.username
    updatedComment['photo_id'] = this.props.photo._id
    updatedComment['content'] = this.state.comment
    this.setState({ comment: "" })
    APIManager.post(url, updatedComment)
      .then(res => {
        let updatedComments = Object.assign([], this.state.comments)
        updatedComments.unshift(res.result)
        this.setState({ comments: updatedComments })
        this.setState({ snackbarOpen: true })
      })
      .catch((err) => {
        console.log('ERROR IN HANDLECOMMENTSEND: ' + err)
      })
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false })
  }

  handleSnackbarClose() {
    this.setState({ snackbarOpen: false })
  }

  render() {
    const photo = this.props.photo
    const comments = this.state.comments
    const actions = [
      <FlatButton
        label="知道了"
        primary={true}
        onTouchTap={this.handleDialogClose.bind(this)}
        />
    ]

    return (
      <div style={styles.root}>
        <div style={styles.photoContainer}>
          {/* <ImageZoom
            image={{
              src: photo.src,
              style: styles.photoImg
            }}
            zoomImage={{
              src: photo.url,
              style: styles.zoomImage
            }}
            /> */}
          <img style={styles.photoImg} src={photo.src} onTouchTap={() => this.setState({ lightboxOpen: true })} />
          {this.state.lightboxOpen &&
            <Lightbox
              mainSrc={photo.url}
              mainSrcThumbnail={photo.src}
              onCloseRequest={() => this.setState({ lightboxOpen: false })}
              />
          }
        </div>
        {(this.state.commentsOpen == true)
          ?
          <div style={styles.photodetail}>
            <Subheader>Comments</Subheader>
            <List style={styles.commentsList}>
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
            <div style={styles.textFieldContainer}>
              <Divider />
              <TextField
                floatingLabelText="Add a comment"
                hintText="Add a comment"
                fullWidth={true}
                underlineShow={true}
                multiLine={true}
                rowsMax={5}
                rows={2}
                onChange={this.handleContentUpdate.bind(this)}
                value={this.state.comment} />
              <div>
                <FlatButton label="Send A Comment" onTouchTap={this.handleCommentSend.bind(this)} />
                <FlatButton label="Back To Detail" onTouchTap={this.handleCommentsToggle.bind(this)} />
              </div>
            </div>
          </div>
          :
          <div style={styles.photodetail}>
            <Card style={styles.photoCard}
              containerStyle={styles.cardContainer} >
              <CardHeader
                title={photo.profile_name}
                avatar="images/jsa-128.jpg"
                />
              <CardTitle title={photo.name} />
              <CardText>{photo.caption}</CardText>
              <CardActions style={styles.cardActions}>
                <FlatButton label="View Comments" onTouchTap={this.handleCommentsToggle.bind(this)} />
                <FlatButton label="Get Original" href={photo.url} target="_blank" />
              </CardActions>
            </Card>
          </div>
        }
        <Dialog
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
          >
          无语是您的评论吗？
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message="感谢您的点评！"
          autoHideDuration={3000}
          action="close"
          onRequestClose={this.handleSnackbarClose.bind(this)}
          onActionTouchTap={this.handleSnackbarClose.bind(this)}
          />
      </div>
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

  }
}

export default connect(stateToProps, dispatchToProps)(PhotoDetail)