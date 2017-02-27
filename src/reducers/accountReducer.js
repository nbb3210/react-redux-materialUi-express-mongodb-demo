import constants from '../constants'

let initialState = {
  user: null
}

export default (state = initialState, action) => {

  let updated = Object.assign({}, state)
  switch (action.type) {

    case constants.UPDATE_USER:
      updated['user'] = action.user
      return updated

    default:
      return updated
      
  }

}