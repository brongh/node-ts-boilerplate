export class CustomError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    } else if (this instanceof NotFound) {
      return 404;
    }
    return 500;
  }
}

export class BadRequest extends CustomError {}
export class NotFound extends CustomError {}
