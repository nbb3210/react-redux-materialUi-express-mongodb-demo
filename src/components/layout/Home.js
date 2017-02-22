import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import Avatar from 'material-ui/Avatar'
import { blue500, grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import Drawer from 'material-ui/Drawer'
import DropDownMenu from 'material-ui/DropDownMenu'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import Badge from 'material-ui/Badge'
import Subheader from 'material-ui/Subheader'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationMoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import CloudUploadIcon from 'material-ui/svg-icons/file/cloud-upload'
import CloudDownloadIcon from 'material-ui/svg-icons/file/cloud-download'
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo'
import NavigateBeforeIcon from 'material-ui/svg-icons/image/navigate-before'
import NavigateNextIcon from 'material-ui/svg-icons/image/navigate-next'
import HomeIcon from 'material-ui/svg-icons/action/home'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import ImageIcon from 'material-ui/svg-icons/image/image'
import Dropzone from 'react-dropzone'
import { Grid, Row, Col } from 'react-flexbox-grid'
import sha1 from 'sha1'
import { APIManager } from '../../utils'
import { PhotoDetail } from '../containers'

const styles = {
  root: {
    height: 'calc(100% - 40px)',
    width: 'calc(100% - 40px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20
  },
  main: {
    flexGrow: 1,
    height: '100%'
  },
  dropzone: {
    border: 'none'
  },
  img: {
    width: '100%'
  },
  photoListContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    overflowY: 'auto',
    overflowX: 'auto',
    height: 'calc(100% - 120px)'
  },
  col: {
    marginBottom: 10
  },
  uploadingimg: {
    width: '96%',
    marginTop: '2%',
    marginLeft: '2%'
  }
}

class Home extends Component {

  constructor() {
    super()
    this.state = {
      selectedIndex: 0,
      dropDownMenuValue: 2,
      dialogOpen: false,
      photoOpen: false,
      snackbarOpen: false,
      snackbarMessage: '',
      submitedPhotos: [],
      uploadingPhotos: [],
      canceledPhotos: [],
      selectedPhoto: {},
      unhandledPhotos: [],
      displayPhoto: {},
      otherPhotos: []
    }
  }

  componentDidMount() {
    this.props.fetchMyPhotos({ profile_id: this.props.account.user._id })
    let url = '/api/photo/others/' + this.props.account.user._id
    APIManager.get(url, null)
      .then(res => {
        let updatedOtherPhotos = Object.assign([], this.state.otherPhotos)
        updatedOtherPhotos = res.results
        this.setState({ otherPhotos: updatedOtherPhotos })
      })
      .catch((err) => {
        console.log('ERROR IN COMPONENTDIDMOUNT: ' + err)
      })
  }

  handleDropDownMenuChange(event, index, value) {
    this.setState({ dropDownMenuValue: value })
  }

  handleDialogCancel() {
    // 隐藏对话框
    this.setState({ dialogOpen: false })
    // 将文件添加到取消文件数组中
    let updatedCanceledPhotos = Object.assign([], this.state.canceledPhotos)
    updatedCanceledPhotos.unshift(this.state.selectedPhoto)
    this.setState({ canceledPhotos: updatedCanceledPhotos })
    // 检查其是否为已回调的文件
    let unhandledPhotoIndex = this.state.unhandledPhotos.findIndex((ele) => {
      return ele.public_id == this.state.selectedPhoto.public_id
    })
    // 若是则将其从未处理的文件数组中删除，所谓的未处理文件是指用户没有选择取消或提交的文件
    if (unhandledPhotoIndex != -1) {
      let updatedUnhandledPhotos = Object.assign([], this.state.unhandledPhotos)
      updatedUnhandledPhotos.splice(unhandledPhotoIndex, 1)
      this.setState({ unhandledPhotos: updatedUnhandledPhotos })
    }
    // 将当前选择的文件清除
    this.setState({ selectedPhoto: {} })
  }

  handleDialogSubmit() {
    // 隐藏对话框
    this.setState({ dialogOpen: false })
    // 将文件添加到提交文件数组中
    let updatedSubmitedPhotos = Object.assign([], this.state.submitedPhotos)
    updatedSubmitedPhotos.unshift(this.state.selectedPhoto)
    this.setState({ submitedPhotos: updatedSubmitedPhotos })
    // 检查其是否为已回调的文件
    let unhandledPhotoIndex = this.state.unhandledPhotos.findIndex((ele) => {
      return ele.public_id == this.state.selectedPhoto.public_id
    })
    // 若是则将其从未处理的文件数组中删除，并将其上传至数据库
    if (unhandledPhotoIndex != -1) {
      let secure_url = this.state.unhandledPhotos[unhandledPhotoIndex]['secure_url']
      let updatedUnhandledPhotos = Object.assign([], this.state.unhandledPhotos)
      updatedUnhandledPhotos.splice(unhandledPhotoIndex, 1)
      this.setState({ unhandledPhotos: updatedUnhandledPhotos })
      // 生成src
      let suffix = secure_url.lastIndexOf('.')
      let image = secure_url.substring(0, suffix) + '.webp'
      let images = image.split('/image/upload/')
      let src = images[0] + '/image/upload/q_auto:eco/' + images[1]
      // 存进数据库
      this.props.createPhoto({
        profile_id: this.props.account.user._id,
        profile_name: this.props.account.user.username,
        name: this.state.selectedPhoto['name'],
        caption: this.state.selectedPhoto['caption'],
        url: secure_url,
        src: src,
        public_id: this.state.selectedPhoto['public_id']
      })
    } else {
      // 若文件没有上传到数据库中，则将文件添加到正在上传文件数组中
      let updatedUploadingPhotos = Object.assign([], this.state.uploadingPhotos)
      updatedUploadingPhotos.unshift(this.state.selectedPhoto)
      this.setState({ uploadingPhotos: updatedUploadingPhotos })
    }
    // 将选择的文件清除
    this.setState({ selectedPhoto: {} })
  }

  handleDialogOpen() {
    if (this.state.dialogOpen == false)
      this.setState({ dialogOpen: true })
  }

  handlePhotoSelect(photos) {
    // upload photo to cloudinary
    const author = this.props.account.user.username
    const timestamp = Date.now() / 1000
    const public_id = author + timestamp
    const image = photos[0]
    const cloudName = 'drhxwqwb4'
    const url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload'
    const uploadPreset = 'crtyvp68'
    const paramsStr = 'public_id=' + public_id + '&timestamp=' + timestamp + '&upload_preset=' + uploadPreset + 'lKYQwpo_4oqsuMpNPwE5AmmhKeI'
    const signature = sha1(paramsStr)
    const params = {
      'api_key': '648725933312678',
      'timestamp': timestamp,
      'public_id': public_id,
      'upload_preset': uploadPreset,
      'signature': signature
    }
    // 将其标为当前选择的文件
    let updatedSelectedPhoto = Object.assign({}, this.state.selectedPhoto)
    updatedSelectedPhoto = photos[0]
    updatedSelectedPhoto['public_id'] = public_id
    this.setState({ selectedPhoto: updatedSelectedPhoto })

    APIManager.uploadFile(url, image, params)
      .then((uploaded) => {
        console.log('UPLOAD COMPLETE: ' + JSON.stringify(uploaded))

        let submitedPhoto = this.state.submitedPhotos.find((ele) => {
          return ele.public_id == uploaded.public_id
        })

        let canceledPhoto = this.state.canceledPhotos.find((ele) => {
          return ele.public_id == uploaded.public_id
        })
        // 若在提交文件数组中发现该文件，表明文件已被用户进行了分类，不是未处理文件
        if (submitedPhoto) {
          // 生成src
          let suffix = uploaded['secure_url'].lastIndexOf('.')
          let image = uploaded['secure_url'].substring(0, suffix) + '.webp'
          let images = image.split('/image/upload/')
          let src = images[0] + '/image/upload/q_auto:eco/' + images[1]
          // 存进数据库
          this.props.createPhoto({
            profile_id: this.props.account.user._id,
            profile_name: this.props.account.user.username,
            name: submitedPhoto['name'],
            caption: submitedPhoto['caption'],
            url: uploaded['secure_url'],
            src: src,
            public_id: public_id
          })
          // 将其从正在上传的文件中删除
          let uploadedPhotoIndex = this.state.uploadingPhotos.findIndex((ele) => {
            return ele.public_id == uploaded.public_id
          })
          let updatedUploadingPhotos = Object.assign([], this.state.uploadingPhotos)
          updatedUploadingPhotos.splice(uploadedPhotoIndex, 1)
          this.setState({ uploadingPhotos: updatedUploadingPhotos })
          this.setState({ snackbarOpen: true })
          this.setState({ snackbarMessage: submitedPhoto['name'] + "上传成功！" })
        }
        // 若在取消文件数组中发现该文件，表明文件已被用户进行了分类，不是未处理文件
        if (canceledPhoto) {

        }
        // 表明用户未对该文件是取消还是提交进行选择，将其添加至未处理文件数组中
        if (this.state.selectedPhoto.public_id == uploaded.public_id) {
          let updatedUnhandledPhotos = Object.assign([], this.state.unhandledPhotos)
          updatedUnhandledPhotos.unshift(uploaded)
          this.setState({ unhandledPhotos: updatedUnhandledPhotos })
        }

      })
      .catch((err) => {
        alert(err)
      })
  }

  handleNameUpdate(event, value) {
    let updatedSelectedPhoto = Object.assign({}, this.state.selectedPhoto)
    updatedSelectedPhoto['name'] = value
    this.setState({ selectedPhoto: updatedSelectedPhoto })
  }

  handleCaptionUpdate(event, value) {
    let updatedSelectedPhoto = Object.assign({}, this.state.selectedPhoto)
    updatedSelectedPhoto['caption'] = value
    this.setState({ selectedPhoto: updatedSelectedPhoto })
  }

  handleSnackbarClose() {
    this.setState({ snackbarOpen: false })
  }

  handleMenuValueChange() {
    this.setState({ dropDownMenuValue: 3 })
  }

  handlePhotoDelete(id) {
    this.props.deleteMyPhotos(id)
  }

  handlePhotoClick(photo) {
    this.setState({ photoOpen: true })
    this.setState({ displayPhoto: photo })
  }

  handleHomeClick() {
    this.setState({ photoOpen: false })
  }

  handleBeforeClick() {
    if (this.state.dropDownMenuValue == 2) {
      let photoIndex = this.props.photo.list.findIndex((ele) => {
        return ele._id == this.state.displayPhoto._id
      })
      let index = (photoIndex == 0) ? (this.props.photo.list.length - 1) : (photoIndex - 1)
      this.setState({ displayPhoto: this.props.photo.list[index] })
    }

    if (this.state.dropDownMenuValue == 1) {
      let photoIndex = this.state.otherPhotos.findIndex((ele) => {
        return ele._id == this.state.displayPhoto._id
      })
      let index = (photoIndex == 0) ? (this.state.otherPhotos.length - 1) : (photoIndex - 1)
      this.setState({ displayPhoto: this.state.otherPhotos[index] })
    }
  }

  handleNextClick() {
    if (this.state.dropDownMenuValue == 2) {
      let photoIndex = this.props.photo.list.findIndex((ele) => {
        return ele._id == this.state.displayPhoto._id
      })
      let index = (photoIndex == (this.props.photo.list.length - 1)) ? 0 : (photoIndex + 1)
      this.setState({ displayPhoto: this.props.photo.list[index] })
    }

    if (this.state.dropDownMenuValue == 1) {
      let photoIndex = this.state.otherPhotos.findIndex((ele) => {
        return ele._id == this.state.displayPhoto._id
      })
      let index = (photoIndex == (this.state.otherPhotos.length - 1)) ? 0 : (photoIndex + 1)
      this.setState({ displayPhoto: this.state.otherPhotos[index] })
    }
  }

  render() {
    const menuitemOnePrimaryText = '朋友的皂片'
    const menuitemTwoPrimaryText = this.props.account.user.username + '的皂片'
    const menuitemThreePrimaryText = '正在上传的皂片'
    const flatbuttonDisabled = (this.state.uploadingPhotos.length == 0) ? true : false
    const flatbuttonLabel = (this.state.uploadingPhotos.length == 0) ? '木有皂片正在' : (this.state.uploadingPhotos.length + "张皂片正在")
    const myPhotoList = (this.props.photo.list == null) ? [] : this.props.photo.list
    const otherPhotoList = this.state.otherPhotos
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogCancel.bind(this)}
        />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogSubmit.bind(this)}
        />
    ]

    return (
      <div style={styles.root}>

        {(this.state.photoOpen == false)
          ?
          <Paper style={styles.main} zDepth={5}>
            <Toolbar>
              <ToolbarGroup firstChild={true}>
                <DropDownMenu value={this.state.dropDownMenuValue} onChange={this.handleDropDownMenuChange.bind(this)}>
                  <MenuItem value={1} primaryText={menuitemOnePrimaryText} />
                  <MenuItem value={2} primaryText={menuitemTwoPrimaryText} />
                  <MenuItem value={3} primaryText={menuitemThreePrimaryText} />
                </DropDownMenu>
              </ToolbarGroup>
              <ToolbarGroup>
                <FlatButton
                  label={flatbuttonLabel}
                  labelPosition="before"
                  primary={true}
                  disabled={flatbuttonDisabled}
                  icon={<CloudUploadIcon />}
                  onTouchTap={this.handleMenuValueChange.bind(this)}
                  />
                <ToolbarSeparator />
                <RaisedButton label="上传皂片" primary={true} onTouchTap={this.handleDialogOpen.bind(this)} />
                <IconMenu
                  iconButtonElement={
                    <IconButton touch={true}>
                      <NavigationMoreVertIcon />
                    </IconButton>
                  }
                  >
                  <MenuItem primaryText="走了" />
                </IconMenu>
              </ToolbarGroup>
            </Toolbar>
            {(this.state.dropDownMenuValue == 1)
              ?
              <div style={styles.photoListContainer}>
                {(otherPhotoList.length == 0)
                  ?
                  <FlatButton
                    label="木有"
                    labelPosition="before"
                    icon={<ImageIcon />}
                    />
                  :
                  <Grid fluid>
                    <Row>
                      {otherPhotoList.map((photo, i) => {
                        return (
                          <Col style={styles.col}
                            xs={12} sm={6} md={4} lg={3}
                            key={i}>
                            <Card>
                              <CardHeader
                                title={photo.profile_name}
                                avatar="images/jsa-128.jpg"
                                />
                              <CardMedia>
                                <img style={{ width: '100%' }} src={photo.src} onTouchTap={this.handlePhotoClick.bind(this, photo)} />
                              </CardMedia>
                              <CardTitle title={photo.name} />
                              <CardText>{photo.caption}</CardText>
                            </Card>
                          </Col>
                        )
                      })
                      }
                    </Row>
                  </Grid>
                }
              </div>
              :
              (this.state.dropDownMenuValue == 2)
                ?
                <div style={styles.photoListContainer}>
                  {(myPhotoList.length == 0)
                    ?
                    <FlatButton
                      label="添加皂片"
                      labelPosition="before"
                      icon={<AddPhotoIcon />}
                      onTouchTap={this.handleDialogOpen.bind(this)}
                      />
                    :
                    <Grid fluid>
                      <Row>
                        {myPhotoList.map((photo, i) => {
                          const localPhoto = this.state.submitedPhotos.find((ele) => {
                            return ele.public_id == photo.public_id
                          })
                          const src = (localPhoto) ? localPhoto.preview : photo.src
                          {/* 若是本地有则用本地图片 */ }
                          return (
                            <Col style={styles.col}
                              xs={12} sm={6} md={4} lg={3}
                              key={i}>
                              <Card>
                                <CardMedia>
                                  <img style={{ width: '100%' }} src={src} onTouchTap={this.handlePhotoClick.bind(this, photo)} />
                                </CardMedia>
                                <CardTitle title={photo.name} showExpandableButton={true} />
                                <CardText expandable={true}>{photo.caption}</CardText>
                                <CardActions expandable={true}>
                                  <FlatButton label="Original" href={photo.url} target="_blank" />
                                  <FlatButton label="Delete" onTouchTap={this.handlePhotoDelete.bind(this, photo._id)} />
                                </CardActions>
                              </Card>
                            </Col>
                          )
                        })
                        }
                      </Row>
                    </Grid>
                  }
                </div>
                :
                <div style={styles.photoListContainer}>
                  {(this.state.uploadingPhotos.length == 0)
                    ?
                    <FlatButton
                      label="木有皂片正在"
                      labelPosition="before"
                      disabled={flatbuttonDisabled}
                      icon={<CloudUploadIcon />}
                      />
                    :
                    <Grid fluid>
                      <Row>
                        {this.state.uploadingPhotos.map((photo, i) => {
                          return (
                            <Col style={styles.col}
                              xs={12} sm={6} md={4} lg={3}
                              key={i}>
                              <Paper style={styles.uploadingpaper} zDepth={3} >
                                <img style={styles.uploadingimg} src={photo.preview} />
                              </Paper>
                            </Col>
                          )
                        })
                        }
                      </Row>
                    </Grid>
                  }
                </div>
            }
          </Paper>
          :
          <Paper style={styles.main} zDepth={5}>
            <BottomNavigation style={{ backgroundColor: 'rgb(232, 232, 232)' }}>
              <BottomNavigationItem
                label="Brefore"
                icon={<NavigateBeforeIcon />}
                onTouchTap={this.handleBeforeClick.bind(this)}
                />
              <BottomNavigationItem
                label="Home"
                icon={<HomeIcon />}
                onTouchTap={this.handleHomeClick.bind(this)}
                />
              <BottomNavigationItem
                label="Next"
                icon={<NavigateNextIcon />}
                onTouchTap={this.handleNextClick.bind(this)}
                />
            </BottomNavigation>
            <PhotoDetail photo={this.state.displayPhoto} />
          </Paper>
        }

        <Dialog
          title="上传皂片"
          actions={actions}
          modal={true}
          open={this.state.dialogOpen}
          autoScrollBodyContent={true}
          >
          <Dropzone style={styles.dropzone}
            multiple={false}
            onDrop={this.handlePhotoSelect.bind(this)}>
            <RaisedButton label="选择皂片" primary={true} fullWidth={true} />
          </Dropzone>
          <Divider />
          <TextField hintText="皂片名称" underlineShow={false} onChange={this.handleNameUpdate.bind(this)} />
          <Divider />
          <TextField hintText="皂片描述" underlineShow={false} multiLine={true} rows={3} onChange={this.handleCaptionUpdate.bind(this)} />
          <Divider />
          {(this.state.selectedPhoto == {})
            ? ''
            : <img style={styles.img} src={this.state.selectedPhoto.preview} />
          }
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          autoHideDuration={3000}
          action="close"
          onRequestClose={this.handleSnackbarClose.bind(this)}
          onActionTouchTap={this.handleSnackbarClose.bind(this)}
          />
      </div >
    )
  }

}

function preloader() {
  return <span>Loading</span>
}

const stateToProps = (state) => {
  return {
    account: state.account,
    photo: state.photo
  }
}

const dispatchToProps = (dispatch) => {
  return {
    checkCurrentUser: () => dispatch(actions.checkCurrentUser()),
    createPhoto: (params) => dispatch(actions.createPhoto(params)),
    fetchMyPhotos: (params) => dispatch(actions.fetchMyPhotos(params)),
    deleteMyPhotos: (params) => dispatch(actions.deleteMyPhotos(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Home)