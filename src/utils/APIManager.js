import superagent from 'superagent'
import Promise from 'bluebird'

export default {

  get: (url, params) => {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .query(params)
        .set('Accept', 'appliaction/json')
        .end((err, res) => {
          if (err) {
            reject(err)
            return
          }
          if (res.body.confirmation != 'success') {
            reject({ message: res.body.message })
            return
          }
          resolve(res.body)
        })

    })
  },

  post: (url, params) => {
    return new Promise((resolve, reject) => {
      superagent
        .post(url)
        .send(params)
        .set('Accept', 'appliaction/json')
        .end((err, res) => {
          if (err) {
            reject(err)
            return
          }
          if (res.body.confirmation != 'success') {
            reject({ message: res.body.message })
            return
          }
          resolve(res.body)
        })

    })
  },

  uploadFile: (url, file, params) => {
    return new Promise((resolve, reject) => {
      let uploadRequest = superagent.post(url)
      uploadRequest.attach('file', file)

      if (params != null) {
        Object.keys(params).forEach((key) => {
          uploadRequest.field(key, params[key])
        })
      }

      uploadRequest.end((err, res) => {
        if (err) {
          reject(err)
          return
        }        
        resolve(res.body)
      })

    })
  }

}