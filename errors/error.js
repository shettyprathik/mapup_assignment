class CustomError extends Error {
  constructor(msg = 'Error') {
    super(msg);
    this.msg = msg;
  }
  serializeErrors() {
    return [{ message: this.msg }];
  }
}

class BadRequestError extends CustomError {
  constructor(msg = 'Bad request') {
    super(msg);
    this.msg = msg;
    this.statusCode = 400;
  }
}

class ServerError extends CustomError {
  constructor(msg = 'Internal server error') {
    super(msg);
    this.msg = msg;
    this.statusCode = 500;
  }
}

class RequestValidationError extends CustomError {
  constructor(errors) {
    super('Invalid request params');
    this.errors = errors;
    this.statusCode = 400;
  }
  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}

class AuthenticationError extends CustomError {
  constructor(msg = 'Not authenticated') {
    super(msg);
    this.msg = msg;
    this.statusCode = 401;
  }
}

class NotFoundError extends CustomError {
  constructor(msg = 'Not found') {
    super(msg);
    this.msg = msg;
    this.statusCode = 404;
  }
}

module.exports = {
  CustomError,
  BadRequestError,
  RequestValidationError,
  AuthenticationError,
  NotFoundError,
  ServerError,
};
