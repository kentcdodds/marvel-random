(function() {
  'use strict';

  MarvelRandom.setApiKey('d0572386610284bcf8e8ebf4b22f4727');

  var characterAndControls = document.getElementById('character-and-controls');
  var loadingContainer = document.getElementById('loading-container');

  var characterEls = {
    avatar: document.getElementById('avatar'),
    name: document.getElementById('character-name'),
    description: document.getElementById('character-description'),
    urls: document.getElementById('character-urls')
  };

  var urlTypes = {
    detail: 'Detail',
    wiki: 'Wiki',
    comiclink: 'Comic Link'
  };

  var characterSet = {
    avatar: function(el, character) {
      if (!character.thumbnail || !character.thumbnail.path || !character.thumbnail.extension) {
        el.src = 'resources/image_not_available.jpg';
      } else {
        el.src = character.thumbnail.path + '.' + character.thumbnail.extension;
      }
    },
    name: function(el, character) {
      el.textContent = character.name || 'Nameless Character...?';
    },
    description: function(el, character) {
      if (!character.description) {
        hideEl(el.parentElement);
        return;
      }
      showEl(el.parentElement);
      el.textContent = character.description;
    },
    urls: function(el, character) {
      if (!character.urls || !character.urls.length) {
        hideEl(el.parentElement);
        return;
      }
      showEl(el.parentElement);
      removeClass(el.parentElement, 'hidden');
      var lis = character.urls.map(function(item) {
        return '<a href="' + item.url + '">' + (urlTypes[item.type] || item.type) + '</a>';
      });
      el.innerHTML = '<li>' + lis.join('</li><li>') + '</li>';
    }
  };

  function getNewCharacter() {
    setLoading(true);
    MarvelRandom.getCharacter({
      success: function(response) {
        var character = response.data.results[0];
        each(characterSet, function(setter, thing) {
          setter(characterEls[thing], character);
        });
        setLoading(false);
      }
    });
  }

  var newCharacterButton = document.getElementById('get-new-character');
  newCharacterButton.addEventListener('click', getNewCharacter);

  getNewCharacter();

  // UTIL FUNCTIONS
  function setLoading(isLoading) {
    var inEl = characterAndControls;
    var outEl = loadingContainer;
    if (isLoading) {
      inEl = loadingContainer;
      outEl = characterAndControls;
    }

    addClass(inEl, 'fadeIn');
    removeClass(inEl, 'fadeOut');
    removeClass(inEl, 'hidden');

    addClass(outEl, 'fadeOut');
    addClass(outEl, 'hidden');
    removeClass(outEl, 'fadeIn');
  }

  // DOM FUNCTIONS
  function hideEl(el) {
    addClass(el, 'hidden');
  }

  function showEl(el) {
    removeClass(el, 'hidden');
  }

  function addClass(el, className) {
    if (hasClass(el, className)) {
      return;
    }
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }

  function removeClass(el, className) {
    if (!hasClass(el, className)) {
      return;
    }
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  function each(obj, iterator) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        iterator(obj[key], key, obj);
      }
    }
  }
})();
