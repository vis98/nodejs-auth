class JwtException extends Error {
  constructor(message, status = 401) {
    if (!message) {
      message = 'Invalid token';
    }
    super(message);
    this.status = status;
    this.error = message;
  }
}

module.exports = JwtException;
