(function () {
  window.cb = function (data) {
    var anchorPrefix = 'image_';
    var currentHash = window.location.hash || '';

    var closingEvent = (function (element) {
      element = element || document.querySelector('body');
      element.addEventListener('click', function () {
        window.location.hash = '';
        var allItems = document.querySelectorAll('#content a');
        Object.keys(allItems).map(function (key, id) {
          var element = allItems[key];
          element.setAttribute('class', '');
        });
        if ( this.tagName.toLowerCase() === 'body') {
          this.setAttribute('class', '');
        }
      }, true);
    })();

    var addEvent = function (item) {
      var event = item.addEventListener('click', function () {
        var clickedElement = this;
        var allItems = document.querySelectorAll('#content a');
        var body = document.querySelector('body').setAttribute('class', 'selected');
        Object.keys(allItems).map(function (key, id) {
          var element = allItems[key];
          var isSelected = clickedElement === element ? 'selected' : '';
          element.setAttribute('class', isSelected);
        });
      });
    };

    var createItem = function (imageUrl, id) {
      var anchor = document.createElement('a');
      anchor.setAttribute('href', '#' + anchorPrefix + id);

      var item = document.createElement('figure');
      if (anchor.getAttribute('href') === currentHash) {
        anchor.setAttribute('class', 'selected');
      }
      addEvent(anchor);

      item.style.backgroundImage = 'url(' + imageUrl + ')';

      var image = document.createElement('img');
      image.setAttribute('src', imageUrl);

      item.appendChild(image);
      anchor.appendChild(item);

      return anchor;
    };

    var container = document.querySelector('#content');

    data.items.map(function (item, id) {
      var element = createItem(item.media.m, id);
      container.appendChild(element);
    });
  };

  var tags = 'london';
  var script = document.createElement('script');
  script.src = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=cb&tags=' + tags;
  document.head.appendChild(script);
})(window);