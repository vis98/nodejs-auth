const BaseException = require('./base.exception');

class InvalidPartnerException extends BaseException {
  constructor(message) {
    super(message, 'INV_PARTNER_ERR');
    this.error = message;
  }
}

module.exports = InvalidPartnerException;
