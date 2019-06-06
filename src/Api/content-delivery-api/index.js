import { languageManager, storageManager } from '../../services'
const config = process.env
const baseUrl = config.REACT_APP_CONTENT_DELIVERY_BASE_URL
const token = config.REACT_APP_CONTENT_DELIVERY_AUTHORIZATION

export function getRequests_catgeories_list () {
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
  let _onRequestErrorCallBack
  function _onRequestError (result) {
    if (_onRequestErrorCallBack) {
      _onRequestErrorCallBack(result)
    }
  }
  let _unKnownErrorCallBack
  function _unKnownError (result) {
    if (_unKnownErrorCallBack) {
      _unKnownErrorCallBack(result)
    }
  }

  const _call = async currentLang => {
    try {
      const url =
        baseUrl +
        `/graphql?query={requestlist{sys{link} title{${currentLang}} description{${currentLang}} thumbnail{${currentLang}} attachments{${currentLang}} contentType{sys{link}} } categories{ sys{link} name{${currentLang}} shortDesc{${currentLang}} _id items parentId image{${currentLang}}}}`
      var rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          clientid: ''
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
          _unKnownError()
          break
      }
    } catch (error) {
      _onRequestError(error)
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
    onRequestError: function (callback) {
      _onRequestErrorCallBack = callback
      return this
    },
    unKnownError: function (callback) {
      _unKnownErrorCallBack = callback
      return this
    }
  }
}
export function filterRequestsByCategory () {
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
  let _onRequestErrorCallBack
  function _onRequestError (result) {
    if (_onRequestErrorCallBack) {
      _onRequestErrorCallBack(result)
    }
  }
  let _unKnownErrorCallBack
  function _unKnownError (result) {
    if (_unKnownErrorCallBack) {
      _unKnownErrorCallBack(result)
    }
  }

  const _call = async (currentLang, link, loadCategory) => {
    try {
      const url =
        baseUrl +
        `/graphql?query={requests(category:"${link}"){sys{link} title{${currentLang}} description{${currentLang}} thumbnail{${currentLang}} attachments{${currentLang}} contentType category } categories{sys{link} name{${currentLang}} shortDesc{${currentLang}} _id items parentId image{${currentLang}} } }`
      var rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
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
          _unKnownError()
          break
      }
    } catch (error) {
      _onRequestError(error)
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
    onRequestError: function (callback) {
      _onRequestErrorCallBack = callback
      return this
    },
    unKnownError: function (callback) {
      _unKnownErrorCallBack = callback
      return this
    }
  }
}
export function getRequestDetail () {
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
  let _onRequestErrorCallBack
  function _onRequestError (result) {
    if (_onRequestErrorCallBack) {
      _onRequestErrorCallBack(result)
    }
  }
  let _unKnownErrorCallBack
  function _unKnownError (result) {
    if (_unKnownErrorCallBack) {
      _unKnownErrorCallBack(result)
    }
  }

  const _call = async (currentLang, link, loadCategory) => {
    try {
      let url =
        baseUrl +
        `/graphql?query={request(link:"${link}"){sys{link} title{${currentLang}} description{${currentLang}} thumbnail{${currentLang}} attachments{${currentLang}} contentType{sys{link}} }   `
      if (loadCategory) {
        url =
          url +
          `categories{sys{link} name{${currentLang}} shortDesc{${currentLang}} _id items parentId image{${currentLang}} } }`
      } else url = url + '}'

      var rawResponse = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
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
          _unKnownError()
          break
      }
    } catch (error) {
      _onRequestError(error)
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
    onRequestError: function (callback) {
      _onRequestErrorCallBack = callback
      return this
    },
    unKnownError: function (callback) {
      _unKnownErrorCallBack = callback
      return this
    }
  }
}
