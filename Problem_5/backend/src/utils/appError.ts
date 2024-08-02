export default class AppError extends Error {
  success: boolean;
  status: string;
  isOperational: boolean;
  isShowMessage: boolean;

  constructor(
    public message: string,
    public statusCode: number = 500,
    public showMessage: boolean = false
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    this.success = false;
    this.isShowMessage = showMessage;

    Error.captureStackTrace(this, this.constructor);
  }
}
