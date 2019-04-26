import { languageManager, useGlobalState } from './../../services'
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
  function _call (name, contentType, category) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();
    const result = data.contents
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
  function _call (name, contentType, category) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();
    const result = data.contentTypes
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
  function _call (obj) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    data.contents.push(obj)

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
  function _call (obj) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.contents.map(item => {
      if (item.sys.id === obj.sys.id) {
        return { ...item, ...obj }
      }
      return item
    })
    data.contents = result

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
  function _call (obj) {
    // const status = rawResponse.status;
    // const result = await rawResponse.json();

    //

    const result = data.contents.filter(item => item.sys.id !== obj.sys.id)
    data.contents = result

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
      result.category = findCategory(data.categories, result.category.id)
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
