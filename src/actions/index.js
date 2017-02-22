import constants from '../constants'
import { APIManager } from '../utils'

export default {

  register: (params) => {
    return (dispatch) => {

      APIManager.post('account/register', params)
        .then((res) => {
          dispatch({
            type: constants.CURRENT_USER_RECEIVED,
            user: res.user
          })
        })
        .catch((err) => {
          console.log('ERROR IN REGSTER: ' + err.message)
        })
    }
  },

  login: (params) => {
    return (dispatch) => {

      APIManager.post('account/login', params)
        .then((res) => {
          dispatch({
            type: constants.CURRENT_USER_RECEIVED,
            user: res.user
          })
        })
        .catch((err) => {
          console.log('ERROR IN LOGIN: ' + err.message)
        })
    }
  },

  checkCurrentUser: () => {
    return (dispatch) => {

      APIManager.get('account/currentuser', null)
        .then((res) => {
          dispatch({
            type: constants.CURRENT_USER_RECEIVED,
            user: res.user
          })
        })
        .catch((err) => {
          console.log('ERROR IN CHECKCURRENTUSER: ' + err.message)
        })
    }
  },

  createPhoto: (params) => {
    return (dispatch) => {

      APIManager.post('/api/photo', params)
        .then(response => {
          dispatch({ type: constants.PHOTO_CREATED, photo: response.result })
        })
        .catch((err) => {
          console.log('ERROR IN CREAREPHOTO: ' + err);
        })

    }
  },

  fetchMyPhotos: (params) => {
    return (dispatch) => {

      APIManager.get('/api/photo', params)
        .then(response => {
          dispatch({ type: constants.MYPHOTOS_RECEIVED, photos: response.results })
        })
        .catch((err) => {
          console.log('ERROR IN FETCHMYPHOTOS: ' + err);
        })

    }
  },

  deleteMyPhotos: (params) => {
    return (dispatch) => {

      APIManager.get('api/photo/delete/' + params, null)
        .then(response => {
          dispatch({ type: constants.MYPHOTO_DELETE, photo: response.result })
        })
        .catch((err) => {
          console.log('ERROR IN DELETEMYPHOTO: ' + err.message)
        })
    }
  }

}