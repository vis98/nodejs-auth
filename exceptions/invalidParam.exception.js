const BaseException = require('./base.exception');

class InvalidParamException extends BaseException {
  constructor(message) {
    super(message, 'INV_PARAM_ERR');
    this.error = message;
  }
}

module.exports = InvalidParamException;
