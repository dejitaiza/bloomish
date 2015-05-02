'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

'use strict';

/**
 * Bloomish
 * 
 * A bloom filter implementation in javascript
 * Author : Omar Kamali
 * License : MIT
 */

var Bloomish = (function () {
  function Bloomish(_ref) {
    var _ref$items = _ref.items;
    var items = _ref$items === undefined ? [] : _ref$items;
    var hash = _ref.hash;
    var reduce = _ref.reduce;
    var has = _ref.has;

    _classCallCheck(this, Bloomish);

    this._set = items;
    this._hash = hash;
    this._reduce = reduce;
    this._has = has;
    this._cache = [];
    this._indexCache = [];
    this._filter = undefined;
  }

  _createClass(Bloomish, [{
    key: 'innerSet',
    value: function innerSet() {
      return this._set;
    }
  }, {
    key: 'hashOf',
    value: function hashOf(item) {
      var itemIndex = this._set.indexOf(item);
      if (itemIndex == -1) {
        return this._hash(item);
      }
      if (!this._indexCache[itemIndex]) {
        this._indexCache[itemIndex] = true;
        this._cache[itemIndex] = this._hash(this._set[itemIndex]);
      }
      return this._cache[itemIndex];
    }
  }, {
    key: 'getFilter',
    value: function getFilter() {
      if (!this._filter) {
        this._filter = this._set.map(this._hash).reduce(this._reduce);
      }

      return this._filter;
    }
  }, {
    key: 'has',
    value: function has(item) {
      return this._has(this.hashOf(item), this.getFilter());
    }
  }]);

  return Bloomish;
})();

exports['default'] = Bloomish;
module.exports = exports['default'];
