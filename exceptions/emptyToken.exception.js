const JwtException = require('./jwtException.exception');

exports.EmptyOrNullToken = class EmptyOrNullToken extends JwtException {
  constructor(message) {
    super(message, 'EMPTY_TOKEN_ERR');
    this.error = message;
  }
};
