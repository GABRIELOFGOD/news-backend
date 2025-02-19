import jwt from "jsonwebtoken";

import { JWT_SECRET } from '../config/env';

export const generateToken = (payload: any) => {
  const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const verified = jwt.verify(token, JWT_SECRET!);
    return verified;
  } catch (error) {
    throw error;
  }
};