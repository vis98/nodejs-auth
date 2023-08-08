const BaseException = require('./base.exception');

class InvalidCreds extends BaseException {
  constructor(message) {
    super(message, 'INV_EVENT_ERR');
    this.error = message;
  }
}

module.exports = InvalidCreds;
