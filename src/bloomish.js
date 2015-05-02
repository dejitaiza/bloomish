'use strict';

/**
 * Bloomish
 * 
 * A bloom filter implementation in javascript
 * Author : Omar Kamali
 * License : MIT
 */
 
export default class Bloomish {
  constructor({items = [], hash, reduce, has}) {
    this._set = items;
    this._hash = hash;
    this._reduce = reduce;
    this._has = has;
    this._cache = [];
    this._indexCache = [];
    this._filter = undefined;
  }

  innerSet() {
    return this._set;
  }

  hashOf(item) {
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

  getFilter() {
    if (!this._filter) {
      this._filter = this._set
        .map(this._hash)
        .reduce(this._reduce);
    }

    return this._filter; 
  }

  has(item) {
    return this._has(this.hashOf(item), this.getFilter());
  }
}