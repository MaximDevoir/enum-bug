# Enum Bug

> Enumerate properties that will not enumerate in older browsers (i.e. IE 8 and below).

[![license](https://badgen.net/badge/license/MIT/blue)](https://www.npmjs.com/package/enum-bug)
[![bundlephobia minzip](https://badgen.net/bundlephobia/minzip/enum-bug)](https://bundlephobia.com/result?p=enum-bug)
[![npm dependents](https://badgen.net/npm/dependents/enum-bug)](https://www.npmjs.com/package/enum-bug?activeTab=dependents)
[![downloads](https://badgen.net/npm/dt/enum-bug)](https://www.npmjs.com/package/enum-bug)
[![Coverage Status](https://coveralls.io/repos/github/MaximDevoir/enum-bug/badge.svg?branch=master)](https://coveralls.io/github/MaximDevoir/enum-bug?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/MaximDevoir/enum-bug/badge.svg)](https://snyk.io/test/github/MaximDevoir/enum-bug)

## Installation

```shell
npm install enum-bug
```

Note: use `add --save` if you are using npm < 5.0.0

## Usage

```javascript
import enumBug from 'enum-bug';

const obj = {
  hello: 'not a bugged property',
  constructor: 'bugged property',
  hasOwnProperty: 'bugged property',
  isPrototypeOf: 'bugged property',
  propertyIsEnumerable: 'bugged property',
  toLocaleString: 'bugged property',
  toString: 'bugged property',
  valueOf: 'bugged property',
  goodbye: 'another normally enumerated property',
};

enumBug(obj, prop => {
  console.log(`${prop} is bugged.`);
});
```

By executing the code in an environment that contains an object enumeration bug (i.e. Internet Explorer 8 and below), the result will be

```python
// console
 => constructor is bugged
 => hasOwnProperty is bugged
 => isPrototypeOf is bugged
 => propertyIsEnumerable is bugged
 => toLocaleString is bugged
 => toString is bugged
 => valueOf is bugged
```

## Note

The bugged properties are:

- `constructor`
- `hasOwnProperty`
- `isPrototypeOf`
- `propertyIsEnumerable`
- `toLocaleString`
- `toString`
- `valueOf`

This module will only enumerate over bugged properties in environments where they would not otherwise be enumerated.

If the environment enumerates object properties properly, then no properties are enumerated.
