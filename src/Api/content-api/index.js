import { languageManager, storageManager } from './../../services'
const config = process.env
// const getAllURL =
//   config.REACT_APP_CONTENT_TYPE_BASE_URL + config.REACT_APP_CONTENT_TYPE_GET_ALL

const getAllURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_GET_ALL
const getByIdURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_GET_BY_ID
const addURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_ADD
const updateURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_UPDATE
const deleteURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_DELETE
const archiveURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_ARCHIVE
const unArchiveURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_UN_ARCHIVE
const publishURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_PUBLISH
const unPublishURL =
  config.REACT_APP_CONTENTS_BASE_URL + config.REACT_APP_CONTENTS_UN_PUBLISH

const getContentTypesURL =
  config.REACT_APP_CONTENT_TYPE_BASE_URL + config.REACT_APP_CONTENT_TYPE_GET_ALL

const currentLang = languageManager.getCurrentLanguage().name
const data = require('./../data.json')

export function filterContents () {
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
  function _call (name, contentType, category, status) {
    const f_data = data.contents.filter(item => {
      if (name && name.length > 0) {
        if (!item.fields.name[currentLang].toLowerCase().includes(name)) {
          return false
        }
      }
      if (contentType) {
        if (item.contentType.id !== contentType) return false
      }
      if (category) {
        if (item.category.id !== category) return false
      }
      if (status) {
        if (item.status !== status) return false
      }
      return true
    })
    _onOk(f_data)
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
export function getByContentTypes () {
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
  function _call (contentTypes = []) {
    let result = []
    if (contentTypes.length === 0) {
      result = data.contents
    } else {
      for (let i = 0; i < contentTypes.length; i++) {
        const contentTypeId = contentTypes[i]
        for (let j = 0; j < data.contents.length; j++) {
          const content = data.contents[i]
          if (content.contentType.id === contentTypeId) {
            result.push(content)
            break
          }
        }
      }
    }
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

export function getContents () {
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
  const _call = async spaceId => {
    try {
      const url = getAllURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        }
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
    }
  }
}
export function getContentTypes () {
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
  const _call = async spaceId => {
    try {
      const url = getContentTypesURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        }
      })
      const status = rawResponse.status
      const result = await rawResponse.json()
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
    }
  }
}

export function getCategories () {
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
    const result = data.categories
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
export function addContent () {
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
  const _call = async (spaceId, content) => {
    try {
      const url = addURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify(content)
      })
      const status = rawResponse.status
      const result = await rawResponse.json()
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
    }
  }
}
export function updateContent () {
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
  const _call = async (spaceId, content) => {
    try {
      const url = updateURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify({
          id: content._id,
          contentType: content.contentType,
          category: content.category,
          fields: content.fields
        })
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
    }
  }
}
export function deleteContent () {
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
  const _call = async (spaceId, contentId) => {
    try {
      const url = deleteURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'DELETE',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify({
          id: contentId
        })
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
    } catch (error) {
      debugger

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
export function getContentById () {
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
    function findCategory (list, id) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].sys.id === id) {
          return list[i]
        }
        if (list[i].children) return findCategory(list[i].children, id)
      }
    }

    //
    const item = data.contents.find(item => item.sys.id === id)
    let status
    let result = item !== undefined ? { ...item } : undefined
    if (result) {
      status = 200
      result.contentType = data.contentTypes.find(
        item => item.sys.id === result.contentType.id
      )
      //  result.category = findCategory(data.categories, result.category.id)
    } else {
      status = 404
    }
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
  const _call = async (spaceId, assetId) => {
    try {
      const url = publishURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify({
          id: assetId
        })
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
  const _call = async (spaceId, contentId) => {
    try {
      const url = unPublishURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify({
          id: contentId
        })
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
    } catch (error) {
      _onServerError(error)
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
  const _call = async (spaceId, contentId) => {
    try {
      const url = archiveURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify({
          id: contentId
        })
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
  const _call = async (spaceId, contentId) => {
    try {
      const url = unArchiveURL
      const token = storageManager.getItem('token')
      var rawResponse = await fetch(url, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          spaceId: spaceId
        },
        body: JSON.stringify({
          id: contentId
        })
      })

      const status = rawResponse.status
      const result = await rawResponse.json()
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
    } catch (error) {
      _onServerError(error)
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
