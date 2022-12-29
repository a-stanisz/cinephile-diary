class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

class DataAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataAccessError';
  }
}

class UnknownError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnknownError';
  }
}

module.exports = {
  AuthenticationError,
  ValidationError,
  AuthorizationError,
  DataAccessError,
  UnknownError,
};
