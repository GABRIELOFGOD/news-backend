// import { NextFunction, Response, Request } from "express";
// import { StatusCode } from "../services/statusCode";

// export class AppError extends Error {
//   public statusCode: number;
//   public status: string;
//   public isOperational: boolean;

//   constructor(message: string, statusCode: number) {
//     super(message);

//     this.statusCode = statusCode;
//     this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//     this.isOperational = true;

//     Error.captureStackTrace(this, this.constructor);
//   }
// }

// export const  globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
//   // ================== SET DEFAULT ERROR VALUES ================== //
//   err.statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
//   err.status = err.status || 'error';

//   // ================== SEND OPERATIONAL ERROR MESSAGE ================== //
//   if (err instanceof AppError) {
//     // ================== SEND OPERATIONAL ERROR MESSAGE ================== //
//     return res.status(err.statusCode).json({
//       success: false,
//       status: err.status,
//       message: err.message,
//     });
//   }

//   console.error('ERROR 💥', err);

//   // ================= SEND GENERIC ERROR MESSAGE ================== //
//   res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
//     success: false,
//     status: 'error',
//     message: 'Something went very wrong!',
//   });
// };

import { NextFunction, Response, Request } from "express";

export class AppError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("ERROR 💥:", err);
  if (err.statusCode == 500) {
    console.error("ERROR 💥:", {
      name: err.name,
      message: err.message,
      stack: err.stack,
      statusCode: err.statusCode,
      status: err.status,
      success: false,
    });
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  res.status(statusCode).json({
    success: false,
    status,
    message: err.message || "Something went very wrong!",
  });
};
