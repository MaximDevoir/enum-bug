# Enum Bug
Enumerate bugged properties that will not enumerate in older browsers (i.e. IE 8 and below).

## Installation
```
npm install bitbucket:maximdevoir/enum-bug
```

## Usage

```
import enumBug from 'enum-bug';

const obj = {
  hi: 'works fine',
  constructor: 'bugged property'
  hasOwnProperty: 'bugged property'
  isPrototypeOf: 'bugged property'
  propertyIsEnumerable: 'bugged property'
  toLocaleString: 'bugged property'
  toString: 'bugged property'
  valueOf: 'bugged property'
  bye: 'alright',
};

enumBug(obj, (prop) => {
  console.log(`${prop} is bugged.`);
});
```

If you run this in in bugged environments (i.e. Internet Explorer 8 and below) the result will be
```
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

This module will only enumerate over bugged-props in environments that have this enumeration bug. Otherwise, it will do nothing.
