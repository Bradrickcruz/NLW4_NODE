export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly details: Array<string> | string;

  constructor(message: string, statusCode = 400, details = []) {
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
  }
}
