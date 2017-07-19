const Helpers = {}

Helpers.getObjectType = (object) => {
  const objectString = Object.prototype.toString.call(object)
  return objectString.substring(8, objectString.length -1)
}

module.exports = Helpers
