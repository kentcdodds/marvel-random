/**
 * MarvelRandom
 * @author Kent C. Dodds
 * License MIT
 */
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.MarvelRandom = factory();
  }
}(this, function () {
  'use strict';
  var apiKey = null;

  function setApiKey(key) {
    apiKey = key;
  }

  /**
   * If options has an id, a specific character will be requested. Otherwise it'll be random.
   * The random characters defaults to 1, but you can ask for more (limited by marvel's api)
   * by providing a totalCharacters property
   *
   * @param options
   */
  function getCharacter(options) {
    ensureReady();
    options = options || {};
    options.success = options.success || noop;
    options.error = options.error || noop;

    if (options.id) {
      getCharacterById(options);
    } else {
      getRandomCharacter(options);
    }
  }

  // MODULE
  return {
    setApiKey: setApiKey,
    getCharacter: getCharacter
  };



  // UTIL FUNCTIONS

  function ensureReady(options) {
    if (!apiKey && !options.apiKey) {
      throw new Error('You must first call setApiKey before MarvelRandom can do anything...');
    }
  }

  function getRandomCharacter(options) {
    var totalCharacters = 1478;
    var characterOffset = options.characterOffset || getRandomInt(0, totalCharacters);
    return marvelRequest({
      apiUrl: '/v1/public/characters',
      params: {
        limit: options.totalCharacters || 1,
        offset: characterOffset
      },
      success: options.success,
      error: options.error
    });
  }

  function getCharacterById(options) {
    return marvelRequest({
      apiUrl: '/v1/public/characters/' + options.id,
      success: options.success,
      error: options.error
    });
  }

  function marvelRequest(options) {
    var params = options.params || {};
    params.apikey = params.apikey || apiKey;
    var urlParams = urlizeParams(params);
    var marvelPrefix = 'http://gateway.marvel.com:80';
    return getReq(marvelPrefix + options.apiUrl + '?' + urlParams, options.success, options.error);
  }

  function urlizeParams(params) {
    var keyEqValParams = [];
    each(params, function(value, name) {
      keyEqValParams.push(encodeURIComponent(name) + '=' + encodeURIComponent(value));
    });
    return keyEqValParams.join('&');
  }

  function each(obj, iterator) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator(obj[key], key, obj);
      }
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function noop() {}

  function getReq(url, onSuccess, onError) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      var resp = JSON.parse(request.responseText);
      if (request.status >= 200 && request.status < 400){
        onSuccess(resp, request.status, request);
      } else {
        onError(resp, request.status, request);
      }
    };

    request.onerror = function() {
      onError(request.responseText, request.status, request);
    };

    request.send();
  }
}));