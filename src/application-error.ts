export class ApplicationError extends Error {

  public errorNumber: number;
  constructor(message) {
    super(message);
  }
}