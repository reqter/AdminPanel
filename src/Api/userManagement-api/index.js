const data = require("./../data.json");

export function filterUsers() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(roleId = undefined, s = undefined) {
    let result;
    result = [...data.users].filter(item => {
      if (roleId) {
        if (item.roles) {
          let res = false;
          for (let i = 0; i < item.roles.length; i++) {
            const role = item.roles[i];
            if (role.id === roleId) {
              res = true;
              break;
            }
          }
          if (!res) return false;
        }
      }
      if (s) if (item.status !== s) return false;

      return true;
    });

    const status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}

export function getUsers() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(name, contentType, category) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();
    const result = data.users;
    const status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest(result);
        break;
      case 401:
        _unAuthorized(result);
        break;
      case 404:
        _notFound(result);
        break;
      case 500:
        _onServerError(result);
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}

export function getRoles() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(name, contentType, category) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();
    const result = [
      {
        id: "1",
        name: {
          en: "Admin",
          fa: "مدیر"
        },
        icon: "icon-file-text-o"
      },
      {
        id: "2",
        name: {
          en: "Sellers",
          fa: "فروشندگان"
        },
        icon: "icon-file-text-o"
      },
      {
        id: "3",
        name: {
          en: "Buyers",
          fa: "خریداران"
        },
        icon: "icon-file-text-o"
      },
      {
        id: "4",
        name: {
          en: "Supports",
          fa: "پشتیبان"
        },
        icon: "icon-file-text-o"
      }
    ];
    const status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest(result);
        break;
      case 401:
        _unAuthorized(result);
        break;
      case 404:
        _notFound(result);
        break;
      case 500:
        _onServerError(result);
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}

export function addUser() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(obj) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //

    data.users.push(obj);

    const status = 200;
    switch (status) {
      case 200:
        _onOk();
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}
export function updateUser() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(obj) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //

    const result = data.users.map(item => {
      if (item.id === obj.id) {
        return { ...item, ...obj };
      }
      return item;
    });
    data.users = result;

    const status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}
export function deleteUser() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(obj) {
    //const status = rawResponse.status;
    //const result = await 500Response.json();

    //

    const result = data.users.filter(item => item.id !== obj.id);
    data.users = result;

    const status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}
export function getUserById() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(id) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    const result = data.users.find(item => item.id === id);
    let status = 200;
    if (!result) status = 404;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}
export function activeUser() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(user) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //

    const result = data.users.map(item => {
      if (item.id === user.id) item.status = "active";
      return item;
    });
    data.users = result;
    let status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}
export function deactiveUser() {
  let _onOkCallBack;
  function _onOk(result) {
    if (_onOkCallBack) {
      _onOkCallBack(result);
    }
  }
  let _onServerErrorCallBack;
  function _onServerError(result) {
    if (_onServerErrorCallBack) {
      _onServerErrorCallBack(result);
    }
  }
  let _onBadRequestCallBack;
  function _onBadRequest(result) {
    if (_onBadRequestCallBack) {
      _onBadRequestCallBack(result);
    }
  }
  let _unAuthorizedCallBack;
  function _unAuthorized(result) {
    if (_unAuthorizedCallBack) {
      _unAuthorizedCallBack(result);
    }
  }
  let _notFoundCallBack;
  function _notFound(result) {
    if (_notFoundCallBack) {
      _notFoundCallBack(result);
    }
  }
  let _onConnectionErrorCallBack;
  function _onConnectionError(result) {
    if (_onConnectionErrorCallBack) {
      _onConnectionErrorCallBack(result);
    }
  }
  function _call(user) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //

    const result = data.users.map(item => {
      if (item.id === user.id) item.status = "deactive";
      return item;
    });
    data.users = result;
    let status = 200;
    switch (status) {
      case 200:
        _onOk(result);
        break;
      case 400:
        _onBadRequest();
        break;
      case 401:
        _unAuthorized();
        break;
      case 404:
        _notFound();
        break;
      case 500:
        _onServerError();
        break;
      default:
        break;
    }
  }

  return {
    call: _call,
    onOk: function(callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function(callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function(callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function(callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function(callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function(callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}
