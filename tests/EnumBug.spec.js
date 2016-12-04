/* eslint-env mocha */
/* eslint no-restricted-syntax: 0 */
import chai from 'chai';
import enumBug from './../src/EnumBug';

chai.should();

describe('EnumBug', () => {
  const obj = {
    firstItem: true,
    constructor: true,
    hasOwnProperty: true,
    isPrototypeOf: true,
    propertyIsEnumerable: true,
    toLocaleString: true,
    toString: true,
    valueOf: true,
  };

  let cache = [];

  beforeEach(() => {
    // Reset the cache from each test
    cache = [];
  });

  it('should enumerate over all properties', () => {
    for (const prop in obj) {
      if (({}).hasOwnProperty.call(obj, prop)) {
        cache.push(prop);
      }
    }

    enumBug(obj, (prop) => {
      cache.push(prop);
    });

    cache.length.should.eql(8);
  });
});
