const config = process.env
const login_url =
  config.REACT_APP_ACCOUNT_BASE_URL + config.REACT_APP_ACCOUNT_LOGIN_URL
const signup_url =
  config.REACT_APP_ACCOUNT_BASE_URL + config.REACT_APP_ACCOUNT_SIGNUP_URL
export function login () {
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
  const _call = async (userName, password) => {
    try {
      const url = login_url
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userName,
          password: password
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
export function signup () {
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
  const _call = async (userName, password) => {
    try {
      const url = signup_url
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userName,
          password: password,
          first_name: '',
          last_name: ''
        })
      })
      const status = rawResponse.status
      const result = await rawResponse.json()
      switch (status) {
        case 201:
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
      _onServerError()
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

export function logout () {
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
  const _call = async () => {
    try {
      const url = 'https://reqter-adminapi.herokuapp.com/auth/register'
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
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
      _onServerError()
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

export function getToken () {
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
  const _call = async () => {
    try {
      const url = 'https://reqter-adminapi.herokuapp.com/auth/register'
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
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
export function changePassword () {
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
  const _call = async userName => {
    try {
      const url = 'https://reqter-adminapi.herokuapp.com/auth/register'
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      const status = rawResponse.status
      const result = await rawResponse.json({
        username: userName
      })
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
      _onServerError()
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

export function updateProfile () {
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
  const _call = async userName => {
    try {
      const url = 'https://reqter-adminapi.herokuapp.com/auth/register'
      var rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      const status = rawResponse.status
      const result = await rawResponse.json({
        username: userName
      })
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
      _onServerError()
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

export function getUserInfo () {
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
  const _call = async () => {
    try {
      // const url = login_url
      // const token = localStorage.getItem('token')
      // var rawResponse = await fetch(url, {
      //   method: 'POST',
      //   headers: {
      //     authorization: 'Bearer ' + token,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({})
      // })
      // const status = rawResponse.status
      // const result = await rawResponse.json()
      const status = 200
      const result = {
        email: 'saeed@admin.com',
        firstName: 'saeed12',
        lastName: 'padyab',
        spaces: [{}]
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
