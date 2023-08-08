const BaseException = require('./base.exception');

class MissingParamException extends BaseException {
  constructor(message) {
    super(message, 'MISS_PARAM_ERR');
    this.error = message;
  }
}

module.exports = MissingParamException;
