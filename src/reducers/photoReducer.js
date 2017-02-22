import constants from '../constants'

let initialState = {
  list: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)
  let updatedList = (updated['list'] == null) ? [] : Object.assign([], updated['list'])

  switch (action.type) {
    case constants.PHOTO_CREATED:
      updatedList.unshift(action.photo)
      updated['list'] = updatedList
      return updated

    case constants.MYPHOTOS_RECEIVED:
      updatedList = action.photos
      updated['list'] = updatedList
      return updated

    case constants.MYPHOTO_DELETE:
      let deleteIndex = updatedList.findIndex((ele) => {
        return ele._id == action.photo._id
      })
      updatedList.splice(deleteIndex, 1)
      updated['list'] = updatedList      
      return updated

    default:
      return updated
  }

}