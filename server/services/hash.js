const hashObject = {};

function containsKey(key) {
  return hashObject.hasOwnProperty(key);
}

function get(key) {
  return hashObject[key];
}

function add(key, value) {
  hashObject[key] = value;
}

function remove(key) {
  delete hashObject[key];
}

module.exports = { containsKey, get, add, remove };