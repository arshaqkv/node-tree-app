import { Request, Response, NextFunction } from "express";

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  error: any | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500; // Default to 500 if no statusCode is set
  const message = error.message || "Internal Server Error";
  console.error(`[ERROR]: ${message}`);
  res.status(statusCode).json({ success: false, message });
}; 

export { CustomError, errorHandler };
