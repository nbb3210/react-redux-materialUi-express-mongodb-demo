export function checkStatus200(res) {
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(
      new Error(response.statusText)
    )
  }
}

export function getJSON(res) {
  return res.json()
}