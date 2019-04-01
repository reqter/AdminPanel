const data = require("./../data.json");

export function filterAssets() {
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
  function _call(fileType, state) {
    let result;
    if (fileType === "all" && state === undefined) {
      result = data.assets;
    } else if (fileType === "all" && state) {
      result = [...data.assets].filter(item => item.status === state);
    } else if (fileType !== "all" && state === undefined) {
      result = [...data.assets].filter(item =>
        item.fileType.toLowerCase().includes(fileType)
      );
    } else
      result = [...data.assets].filter(item => {
        if (
          item.fileType.toLowerCase().includes(fileType) &&
          item.status === state
        )
          return true;
        return false;
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

export function getAssets() {
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
    const result = data.assets;
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

export function addAsset() {
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

    data.assets.push(obj);

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
export function updateAsset() {
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

    const result = data.assets.map(item => {
      if (item.sys.id === obj.sys.id) {
        return { ...item, ...obj };
      }
      return item;
    });
    data.assets = result;

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
export function deleteAsset() {
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

    const result = data.assets.filter(item => item.sys.id !== obj.sys.id);
    data.assets = result;

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
export function getAssetById() {
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

    const result = data.assets.find(item => item.sys.id === id);
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
export function publish() {
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

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = "publish";
      return item;
    });
    data.assets = result;
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
export function unPublish() {
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

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = "archive";
      return item;
    });
    data.assets = result;
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
export function archive() {
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

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = "archive";
      return item;
    });
    data.assets = result;
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
export function unArchive() {
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

    //

    const result = data.assets.map(item => {
      if (item.sys.id === id) item.status = "draft";
      return item;
    });
    data.assets = result;
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
