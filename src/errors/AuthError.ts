export class AuthError extends Error {
  constructor(message = 'Auth error') {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype);

    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
