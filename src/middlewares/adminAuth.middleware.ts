import { NextFunction, Response } from "express";
import { Request } from "../@types/custom";
import { verifyToken } from "../services/verifyToken";
import catchAsync from "./catchAsync.middleware";
import { AppError } from "./error.middleware";
import { StatusCode } from "../services/statusCode";
import { JWT_SECRET } from "../config/env";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {

}

// export const userAuth = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).json({ message: "Unauthorized" });
//   const user = verifyToken(token);
//   req.user = user;
//   next();
// });

export const userAuth = catchAsync(async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  // console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    // console.error("Authorization header is missing.");
    return next(new AppError('Unauthorized: Missing Authorization header', StatusCode.UNAUTHORIZED));
  }

  const tokenParts = authHeader.split(' ');
  // console.log("Token Parts:", tokenParts);

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    // console.error("Invalid Authorization header format.");
    return next(new AppError('Unauthorized: Invalid Authorization header format', StatusCode.UNAUTHORIZED));
  }

  const token = tokenParts[1];
  // console.log("Extracted Token:", token);

  if (!token) {
    // console.error("Token is missing in the Authorization header.");
    return next(new AppError('Unauthorized: Token is missing', StatusCode.UNAUTHORIZED));
  }

  try {
    const decoded = verifyToken(token);
    // console.log("Decoded User:", decoded);
    req.user = decoded;
    next();
  } catch (err: any) {
    // console.error("JWT verification error:", err.message);
    return next(new AppError('Unauthorized: Invalid Token', StatusCode.UNAUTHORIZED));
  }
});