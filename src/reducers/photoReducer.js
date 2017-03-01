import constants from '../constants'

let initialState = {
  displayPhoto: null,
  photoListType: 2,
  uploadOpen: false,
  uploadingPhotos: [],
  myPhotos: [],
  friendPhotos: [],
  messageOpen: false,
  message: '',
  displayDetail: true
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)
  switch (action.type) {

    case constants.CHANGE_PHOTOLISTTYPE:
      updated['photoListType'] = action.photoListType
      return updated

    case constants.TOGGLE_UPLOAD:
      updated['uploadOpen'] = (updated.uploadOpen == false) ? true : false
      return updated

    case constants.ADD_MYPHOTOS:
      let updatedMyPhotos = Object.assign([], updated['myPhotos'])
      updatedMyPhotos.unshift(action.photo)
      updated['myPhotos'] = updatedMyPhotos
      return updated


    case constants.ADD_UPLOAINGPHOTOS:
      let updatedUploadingPhotos = Object.assign([], updated['uploadingPhotos'])
      updatedUploadingPhotos.unshift(action.photo)
      updated['uploadingPhotos'] = updatedUploadingPhotos
      return updated

    case constants.UPLOADED_PHOTO:
      let updatedMyPhotosByUploaded = Object.assign([], updated['myPhotos'])
      updatedMyPhotosByUploaded.unshift(action.photo)
      updated['myPhotos'] = updatedMyPhotosByUploaded

      let deleteIndex = updated.uploadingPhotos.findIndex(ele => ele.public_id == action.photo.public_id)
      let updatedUploadingPhotosByUploaded = Object.assign([], updated['uploadingPhotos'])
      updatedUploadingPhotosByUploaded.splice(deleteIndex, 1)
      updated['uploadingPhotos'] = updatedUploadingPhotosByUploaded

      return updated

    case constants.RECEIVE_MYPHOTOS:
      updated.myPhotos = action.photos
      return updated

    case constants.RECEIVE_FRIENDPHOTOS:
      updated.friendPhotos = action.photos
      return updated

    case constants.RECEIVE_MESSAGE:
      updated.messageOpen = true
      updated.message = action.message
      return updated

    case constants.CLOSE_MESSAGE:
      updated.messageOpen = false
      updated.message = ''
      return updated

    case constants.CLICK_PHOTO:
      let updatedDisplay = Object.assign({}, updated['displayPhoto'])
      updatedDisplay = action.photo
      updated['displayPhoto'] = updatedDisplay
      return updated

    case constants.DESTORY_DISPLAY:
      let destoryDisplay = Object.assign({}, updated['displayPhoto'])
      destoryDisplay = null
      updated['displayPhoto'] = destoryDisplay
      return updated

    case constants.TOGGLE_COMMENT:
      updated['displayDetail'] = (updated.displayDetail == false) ? true : false
      return updated

    case constants.REMOVE_MYPHOTO:
      let removeMyphotos = Object.assign([], updated['myPhotos'])
      let removeIndex = removeMyphotos.findIndex(ele => ele._id == action.photoId)
      removeMyphotos.splice(removeIndex, 1)
      updated['myPhotos'] = removeMyphotos
      return updated

    default:
      return updated

  }

}