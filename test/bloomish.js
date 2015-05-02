import {expect} from 'chai';
import Bloomish from '../src/bloomish';
import sinon from 'sinon';

describe('Bloomish', () => {
  it('is defined', () =>{
    expect(Bloomish).to.be.defined;
  });

  it('creates a set from an array', () => {
    let items = [3, 'a', 0, undefined, null];
    let bloom = new Bloomish({items});
    expect(bloom.innerSet()).to.equal(items);
  });

  it('computes the hash of the elements in the set', () => {
    let hashFunction = sinon.spy((item) => {
      return item.length;
    });
    
    let items = [3, 'a', 0, 'hello'];
    let bloom = new Bloomish({
      items,
      hash: hashFunction
    });

    items.forEach((item) => {
      expect(bloom.hashOf(item)).to.equal(hashFunction(item));
    });

    expect(hashFunction.callCount).to.equal(2 * items.length);
  });

  it('caches the hash value of an element', () => {
    let hashFunction = sinon.spy((item) => {
      return item.length;
    });
    
    let items = [3, 'a', 0, 'hello'];
    let bloom = new Bloomish({
      items,
      hash: hashFunction
    });

    items.forEach((item) => {
      bloom.hashOf(item);
    });

    items.forEach((item) => {
      bloom.hashOf(item);
    });

    items.forEach((item) => {
      bloom.hashOf(item);
    });

    expect(hashFunction.callCount).to.equal(items.length);
  });

  it('builds the bloom filter and keeps a cached version of it', () => {
    let hashFunction = sinon.spy((item) => {
      return item.length;
    });

    let hashReduce = sinon.spy((item1, item2) => {
      return item1 + item2;      
    });

    let items = ['a', 'foo', 'bar', 'hello'];

    let bloom = new Bloomish({
      items,
      hash: hashFunction,
      reduce: hashReduce
    });

    let filter = items.map(hashFunction).reduce(hashReduce);
    bloom.getFilter();
    bloom.getFilter();
    bloom.getFilter();
    bloom.getFilter();
    expect(bloom.getFilter()).to.equal(filter);
    expect(hashFunction.callCount).to.equal(2 * items.length);
    expect(hashReduce.callCount).to.equal(2 * (items.length - 1));
  });

  it('checks for an item membership to the set', () => {
     let hashFunction = sinon.spy((item) => {
      return parseInt([
        item.indexOf('a') == -1 ? 0 : 1,
        item.indexOf('l') == -1 ? 0 : 1,
        item.indexOf('f') == -1 ? 0 : 1,
        item.indexOf('o') == -1 ? 0 : 1
      ].join(''), 2);
    });

    let hashReduce = sinon.spy((item1, item2) => {
      return item1 | item2;      
    });

    let hasFunction = sinon.spy((item, filter) => {
      if (item == 0 ) {
        return false;
      }
      return (item & filter) == item;
    });

    let items = ['a', 'foo', 'bar', 'hello'];

    let bloom = new Bloomish({
      items,
      hash: hashFunction,
      reduce: hashReduce,
      has: hasFunction 
    });
  	
    expect(bloom.has('foo')).to.be.true;
    expect(bloom.has('z')).to.be.false;
  });
});