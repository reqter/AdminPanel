const data = require("./../data.json");

export function getContentTypes() {
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
    const result = data.contentTypes;
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
    onOk: function (callback) {
      _onOkCallBack = callback;
      return this;
    },
    onServerError: function (callback) {
      _onServerErrorCallBack = callback;
      return this;
    },
    onBadRequest: function (callback) {
      _onBadRequestCallBack = callback;
      return this;
    },
    notFound: function (callback) {
      _notFoundCallBack = callback;
      return this;
    },
    unAuthorized: function (callback) {
      _unAuthorizedCallBack = callback;
      return this;
    },
    onConnectionError: function (callback) {
      _onConnectionErrorCallBack = callback;
      return this;
    }
  };
}

export function getCategories() {
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
    const result = data.categories;
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
export function addCategory() {
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
    function addNodeInList(list, node) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].sys.id === node.parentId) {
          if (list[i].children === undefined) {
            list[i].children = [];
          }
          list[i].children.push(node);
        }
        if (list[i].children) addNodeInList(list[i].children, node);
      }
    }
    if (obj.parentId === undefined) {
      data.categories.push(obj);
    } else {
      addNodeInList(data.categories, obj);
    }
    const result = data.categories;

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
export function updateCategory() {
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
  function _call(node) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //

    function updateNodeInList(list, node) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].sys.id === node.sys.id) {
          list[i] = node;
        }
        if (list[i].children) updateNodeInList(list[i].children, node);
      }
    }
    updateNodeInList(data.categories, node);
    const result = data.categories;

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
export function deleteCategory() {
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
  function _call(node) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //
    function deleteNodeInList(list, node) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].sys.id === node.sys.id) {
          list.splice(i, 1);
          return;
        }
        if (list[i].children) deleteNodeInList(list[i].children, node);
      }
    }
    deleteNodeInList(data.categories, node);
    const result = data.categories;

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

export function addContentTypeToCategory() {
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
  function _call(categoryId, contentType) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //
    const result = data.categories.map(item => {
      if (item.sys.id === categoryId) {
        let newItem = item;
        if (newItem.itemTypes === undefined) {
          newItem.itemTypes = [];
        }
        newItem.itemTypes.push(contentType);
        return newItem;
      }
      return item;
    });
    data.categories = result;
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

export function removeContentTypeFromCategory() {
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
  function _call(categoryId, contentTypeId) {
    //const status = rawResponse.status;
    //const result = await rawResponse.json();

    //
    const result = data.categories.map(item => {
      if (item.sys.id === categoryId) {
        const newItem = { ...item };
        const f_s = newItem.itemTypes.filter(f => f.sys.id !== contentTypeId);
        newItem.itemTypes = f_s;
        return newItem;
      }
      return item;
    });

    data.categories = result;

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
