import _debug from 'debug'

function log(namespace, message) {
  const debug = _debug(namespace)
  debug(message)
}

export default {
  log,
}
