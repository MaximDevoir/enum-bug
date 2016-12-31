const enumBugProps = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf',
];
const enumBugsLength = enumBugProps.length;
const hasOwnProperty = ({}).hasOwnProperty;

const hasEnumBug = !({}).propertyIsEnumerable.call(({ toString: undefined }), 'toString');

/**
 * Enumerate bugged properties that will not enumerate in older browsers.
 * This will return early if the environment properly supports enumeration of
 * objects properties.
 * @param {Object}   obj      The object to enumerate
 * @param {Function} callback The function to call with the bugged property
 */
function enumBug(obj, callback) {
  if (!hasEnumBug) return;

  for (let i = 0; i < enumBugsLength; i += 1) {
    const prop = enumBugProps[i];
    if (hasOwnProperty.call(obj, prop)) {
      callback.call(undefined, prop);
    }
  }
}

module.exports = enumBug;
