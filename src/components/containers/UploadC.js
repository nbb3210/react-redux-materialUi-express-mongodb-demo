import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { UploadV } from '../views/'
import { checkStatus, getJSON } from '../../utils'
import sha1 from 'sha1'
import superagent from 'superagent'

class UploadC extends Component {

  constructor() {
    super()
    this.state = {
      postPhoto: {},
      errorTextName: '',
      errorTextCaption: '',
      canceledPhotos: [],
      unhandledPhoto: {}
    }
  }

  selectPhoto(photos) {
    const author = this.props.profile.username
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

    let updated = Object.assign({}, this.state.postPhoto)
    updated['preview'] = photos[0]['preview']
    updated['public_id'] = public_id
    updated['profile_id'] = this.props.profile._id
    updated['profile_name'] = this.props.profile.username
    this.setState({
      postPhoto: updated
    })

    let uploadRequest = superagent.post(url).attach('file', image)
    Object.keys(params).forEach((key) => {
      uploadRequest.field(key, params[key])
    })
    uploadRequest.end((err, res) => {
      if (err) {
        console.log(err)
        return
      }

      let cancelPhoto = this.state.canceledPhotos.find(ele => ele.public_id == res.body.public_id)
      if (cancelPhoto) {
        let deleteIndex = this.state.canceledPhotos.findIndex(ele => ele.public_id == res.body.public_id)
        let updatedCanceledPhotos = Object.assign([], this.state.canceledPhotos)
        updatedCanceledPhotos.splice(deleteIndex, 1)
        this.setState({ canceledPhotos: updatedCanceledPhotos })
        return
      }

      let uploadingPhoto = this.props.uploadingPhotos.find(ele => ele.public_id == res.body.public_id)
      if (uploadingPhoto) {
        let params = Object.assign({}, uploadingPhoto)
        let secure_url = res.body.secure_url
        let suffix = secure_url.lastIndexOf('.')
        let image = secure_url.substring(0, suffix) + '.webp'
        let images = image.split('/image/upload/')
        let src = images[0] + '/image/upload/q_auto:eco/' + images[1]
        params['src'] = src
        params['url'] = secure_url        
        let preview = params['preview']
        delete params['preview']
        fetch('api/photos', {
          method: "post",
          body: JSON.stringify(params),
          headers: { "Content-Type": "application/json" },
          mode: 'cors',
          credentials: 'include'
        })
          .then(checkStatus)
          .then(getJSON)
          .then(data => {
            let uploadPhoto = Object.assign(data.result, { preview: preview })            
            this.props.uploadedPhoto(uploadPhoto)
            this.props.receiveMessage(`照片: ${uploadPhoto.name} 添加成功！`)
          })
          .catch(err => console.log(err))
      
        return
      }

      let updatedUnhandledPhoto = Object.assign({}, res.body)
      this.setState({
        unhandledPhoto: updatedUnhandledPhoto
      })
    })


  }

  cancelUpload() {
    if (this.state.unhandledPhoto.public_id == this.state.postPhoto.public_id) {
      this.setState({
        unhandledPhoto: {}
      })
    } else {
      let updatedCanceledPhotos = Object.assign([], this.state.canceledPhotos)
      updatedCanceledPhotos.unshift(this.state.postPhoto)
      this.setState({ canceledPhotos: updatedCanceledPhotos })
    }

    this.setState({
      postPhoto: {}
    })
    this.props.toggleUpload()
  }

  submitUpload() {
    if (this.state.postPhoto.preview == '') {
      this.setState({ errorTextCaption: '请选择上传照片！' })
      return
    } else {
      this.setState({ errorTextCaption: '' })
    }
    if (this.state.postPhoto.name == '') {
      this.setState({ errorTextName: '照片名称不能为空！' })
      return
    } else {
      this.setState({ errorTextName: '' })
    }
    if (this.state.postPhoto.caption == '') {
      this.setState({ errorTextCaption: '照片描述不能为空！' })
      return
    } else {
      this.setState({ errorTextCaption: '' })
    }

    if (this.state.unhandledPhoto.public_id == this.state.postPhoto.public_id) {
      // 若确认提交的图片已经上传至云服务器，则将其相关信息上传至数据库，并且添加到自己的图片数组中
      let params = Object.assign({}, this.state.postPhoto)

      // 生成src
      let secure_url = this.state.unhandledPhoto['secure_url']
      let suffix = secure_url.lastIndexOf('.')
      let image = secure_url.substring(0, suffix) + '.webp'
      let images = image.split('/image/upload/')
      let src = images[0] + '/image/upload/q_auto:eco/' + images[1]
      params['src'] = src
      params['url'] = secure_url
      let preview = params['preview']
      delete params['preview']
      fetch('api/photos', {
        method: "post",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" },
        mode: 'cors',
        credentials: 'include'
      })
        .then(checkStatus)
        .then(getJSON)
        .then(data => {
          let addPhoto = Object.assign(data.result, { preview: preview })
          this.props.addMyPhotos(addPhoto)
          this.props.receiveMessage(`照片: ${addPhoto.name} 添加成功！`)
        })
        .catch(err => console.log(err))

      this.setState({
        unhandledPhoto: {}
      })

    } else {
      // 若图片未上传至云服务器，则添加到正在上传的图片的数组中
      this.props.addUploadingPhotos(this.state.postPhoto)
    }

    this.setState({
      postPhoto: {}
    })
    this.props.toggleUpload()
  }

  updatePhoto(event, value) {
    let updated = Object.assign({}, this.state.postPhoto)
    updated[event.target.id] = event.target.value
    this.setState({
      postPhoto: updated
    })
  }

  render() {
    return (
      <UploadV
        uploadOpen={this.props.uploadOpen}
        preview={this.state.postPhoto.hasOwnProperty('preview') ? this.state.postPhoto.preview : null}
        errorTextName={this.state.errorTextName}
        errorTextCaption={this.state.errorTextCaption}
        selectPhoto={this.selectPhoto.bind(this)}
        cancelUpload={this.cancelUpload.bind(this)}
        submitUpload={this.submitUpload.bind(this)}
        updatePhoto={this.updatePhoto.bind(this)} />
    )
  }

}

const stateToProps = (state) => {
  return {
    profile: state.account.user,
    uploadOpen: state.photo.uploadOpen,
    uploadingPhotos: state.photo.uploadingPhotos
  }
}

const dispatchToProps = (dispatch) => {
  return {
    toggleUpload: () => dispatch(actions.toggleUpload()),
    addMyPhotos: (photo) => dispatch(actions.addMyPhotos(photo)),
    addUploadingPhotos: (photo) => dispatch(actions.addUploadingPhotos(photo)),
    uploadedPhoto: (photo) => dispatch(actions.uploadedPhoto(photo)),
    receiveMessage: (message) => dispatch(actions.receiveMessage(message))
  }
}

export default connect(stateToProps, dispatchToProps)(UploadC)