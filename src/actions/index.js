import constants from '../constants'

export default {

  updateUser: (user) => {
    return (dispatch) => {
      dispatch({
        type: constants.UPDATE_USER,
        user
      })
    }
  },

  logout: () => {
    return (dispatch) => {
      dispatch({
        type: constants.LOGOUT
      })
    }
  },

  changePhotoListType: (photoListType) => {
    return (dispatch) => {
      dispatch({
        type: constants.CHANGE_PHOTOLISTTYPE,
        photoListType
      })
    }
  },

  toggleUpload: () => {
    return (dispatch) => {
      dispatch({
        type: constants.TOGGLE_UPLOAD
      })
    }
  },

  addMyPhotos: (photo) => {
    return (dispatch) => {
      dispatch({
        type: constants.ADD_MYPHOTOS,
        photo
      })
    }
  },

  addUploadingPhotos: (photo) => {
    return (dispatch) => {
      dispatch({
        type: constants.ADD_UPLOAINGPHOTOS,
        photo
      })
    }
  },

  uploadedPhoto: (photo) => {
    return (dispatch) => {
      dispatch({
        type: constants.UPLOADED_PHOTO,
        photo
      })
    }
  },

  receiveMyphotos: (photos) => {
    return (dispatch) => {
      dispatch({
        type: constants.RECEIVE_MYPHOTOS,
        photos
      })
    }
  },

  receiveFriendphotos: (photos) => {
    return (dispatch) => {
      dispatch({
        type: constants.RECEIVE_FRIENDPHOTOS,
        photos
      })
    }
  },

  receiveMessage: (message) => {
    return (dispatch) => {
      dispatch({
        type: constants.RECEIVE_MESSAGE,
        message
      })
    }
  },

  closeMessage: () => {
    return (dispatch) => {
      dispatch({
        type: constants.CLOSE_MESSAGE,
      })
    }
  },

  clickPhoto: (photo) => {
    return (dispatch) => {
      dispatch({
        type: constants.CLICK_PHOTO,
        photo
      })
    }
  },

  destoryDisplay: () => {
    return (dispatch) => {
      dispatch({
        type: constants.DESTORY_DISPLAY,
      })
    }
  },

  toggleComment: () => {
    return (dispatch) => {
      dispatch({
        type: constants.TOGGLE_COMMENT
      })
    }
  },

  removeMyphoto: (photoId) => {
    return (dispatch) => {
      dispatch({
        type: constants.REMOVE_MYPHOTO,
        photoId: photoId
      })
    }
  }

}