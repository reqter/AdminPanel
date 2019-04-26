const config = process.env
const upload_url = config.REACT_APP_FILE_UPLOADER_URL

const data = require('./../data.json')

export function filterAssets () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (
    all,
    image = false,
    video = false,
    audio = false,
    pdf = false,
    spreadsheet = false,
    state = undefined
  ) {
    let result
    if (all && state === undefined) {
      result = data.assets
    } else if (all && state) {
      result = [...data.assets].filter(item => item.status === state)
    } else {
      result = [...data.assets].filter(item => {
        if (image) {
          if (state) {
            if (item.status === state) {
              if (item.fileType.toLowerCase().includes('image')) return true
            }
          } else if (item.fileType.toLowerCase().includes('image')) return true
        }
        if (video) {
          if (state) {
            if (item.status === state) {
              if (item.fileType.toLowerCase().includes('video')) return true
            }
          } else if (item.fileType.toLowerCase().includes('video')) return true
        }
        if (audio) {
          if (state) {
            if (item.status === state) {
              if (item.fileType.toLowerCase().includes('audio')) return true
            }
          } else if (item.fileType.toLowerCase().includes('audio')) return true
        }
        if (pdf) {
          if (state) {
            if (item.status === state) {
              if (item.fileType.toLowerCase().includes('pdf')) return true
            }
          } else if (item.fileType.toLowerCase().includes('pdf')) return true
        }
        if (spreadsheet) {
          if (state) {
            if (item.status === state) {
              if (item.fileType.toLowerCase().includes('spreadsheet')) {
                return true
              }
            }
          } else if (item.fileType.toLowerCase().includes('spreadsheet')) {
            return true
          }
        }
        return false
      })
    }

    const status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}

export function getAssets () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (name, contentType, category) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();
    const result = data.assets
    const status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest(result)
        break
      case 401:
        _unAuthorized(result)
        break
      case 404:
        _notFound(result)
        break
      case 500:
        _onServerError(result)
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}

export function addAsset () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (obj) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    data.assets.push(obj)

    const status = 200
    switch (status) {
      case 200:
        _onOk()
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function updateAsset () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (obj) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.assets.map(item => {
      if (item.sys.id === obj.sys.id) {
        return { ...item, ...obj }
      }
      return item
    })
    data.assets = result

    const status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function deleteAsset () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (obj) {
    // const status = rawResponse.status;
    // const result = await 500Response.json();

    //

    const result = data.assets.filter(item => item.sys.id !== obj.sys.id)
    data.assets = result

    const status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function getAssetById () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (id) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    const result = data.assets.find(item => item.sys.id === id)
    let status = 200
    if (!result) status = 404
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function publish () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (id) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = 'publish'
      return item
    })
    data.assets = result
    let status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function unPublish () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (id) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = 'archive'
      return item
    })
    data.assets = result
    let status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function archive () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (id) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = 'archive'
      return item
    })
    data.assets = result
    let status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}
export function unArchive () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  function _call (id) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = 'draft'
      return item
    })
    data.assets = result
    let status = 200
    switch (status) {
      case 200:
        _onOk(result)
        break
      case 400:
        _onBadRequest()
        break
      case 401:
        _unAuthorized()
        break
      case 404:
        _notFound()
        break
      case 500:
        _onServerError()
        break
      default:
        break
    }
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    }
  }
}

export function uploadAssetFile () {
  let _onOkCallBack
  function _onOk (result) {
    if (_onOkCallBack) {
      _onOkCallBack(result)
    }
  }
  let _onServerErrorCallBack
  function _onServerError (result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result)
    }
  }
  let _onBadRequestCallBack
  function _onBadRequest (result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result)
    }
  }
  let _unAuthorizedCallBack
  function _unAuthorized (result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result)
    }
  }
  let _notFoundCallBack
  function _notFound (result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result)
    }
  }
  let _onConnectionErrorCallBack
  function _onConnectionError (result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result)
    }
  }
  let _onProgressCallBack
  function _onProgress (result) {
    if (_onProgressCallBack) {
      _onProgressCallBack(result)
    }
  }

  const _call = async file => {
    try {
      var xhr = new XMLHttpRequest()
      const url = process.env.REACT_APP_FILE_UPLOADER_URL
      const token = localStorage.getItem('token')

      xhr.open('POST', url)
      xhr.onload = () => {
        const status = xhr.status
        const result = JSON.parse(xhr.response)
        switch (status) {
          case 200:
            _onOk(result)
            break
          case 400:
            _onBadRequest(result)
            break
          case 401:
            _unAuthorized(result)
            break
          case 404:
            _onBadRequest(result)
            break
          case 500:
            _onServerError(result)
            break
          default:
            break
        }
      }
      var formdata = new FormData()
      // formdata.append('file', file)
      formdata.append('file', file, file.name)
      // formdata.append('id', _id)

      if (xhr.upload) {
        xhr.upload.onprogress = event => {
          if (event.lengthComputable) {
            _onProgress(
              Math.round((event.loaded / event.total) * 100).toString()
            )
          }
        }
      }
      xhr.setRequestHeader('authorization', 'Bearer ' + token)
      // xhr.setRequestHeader('content-type', 'multipart/form-data')
      await xhr.send(formdata)
    } catch (error) {}
  }

  return {
    call: _call,
    onOk: function (callback) {
      _onOkCallBack = callback
      return this
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback
      return this
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback
      return this
    },
    notFound: function (callback) {
      _notFoundCallBack = callback
      return this
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback
      return this
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback
      return this
    },
    onProgress: function (callback) {
      _onProgressCallBack = callback
      return this
    }
  }
}
