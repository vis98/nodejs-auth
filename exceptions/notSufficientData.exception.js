const BaseException = require('./base.exception');

class NotSufficientDataException extends BaseException {
  constructor(message) {
    super(message, 'INSUFF_DATA_ERR');
    this.error = message;
  }
}

module.exports = NotSufficientDataException;
