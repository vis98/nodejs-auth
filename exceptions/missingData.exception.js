const BaseException = require('./base.exception');

class MissingDataException extends BaseException {
  constructor(message) {
    super(message, 'MISSING_DATA_ERR');
    this.error = message;
  }
}

module.exports = MissingDataException;
