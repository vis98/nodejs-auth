const JwtException = require('./jwtException.exception');

exports.InvalidTokenException = class InvalidTokenException extends JwtException {
  constructor(message) {
    super(message, 'INVALID_TOKEN_ERR');
    this.error = message;
  }
};
