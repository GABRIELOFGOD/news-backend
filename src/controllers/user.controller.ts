import { NextFunction, Response } from "express";
import { Request } from "../@types/custom";
import catchAsync from "../middlewares/catchAsync.middleware";
import { LoginType, RegisterType } from "../utils/userTypes";
import { UserRepository } from "../services/repositories";
import { AppError } from "../middlewares/error.middleware";
import { StatusCode } from "../services/statusCode";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/verifyToken";
import { getUser } from "../services/getUser";
import { emailValidator } from "../services/validator";

// ============= CREATE USER ============= //
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password }: RegisterType = req.body;

  // ============= INPUT VALIDATION ============= //
  if (!name || !email || !password) return next(new AppError("Please provide all fields", StatusCode.BAD_REQUEST));
  const isEmail = emailValidator(email);
  if (!isEmail) return next(new AppError("Invalid email", StatusCode.BAD_REQUEST));

  // ============= CHECK IF USER EXISTS ============= //
  const userExists = await UserRepository.findOne({ where: { email } });
  if (userExists) return next(new AppError("User already exists", StatusCode.BAD_REQUEST));

  // ============== HASH PASSWORD ============== //
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ============= CREATE USER ============= //
  const user = UserRepository.create({
    name,
    email,
    password: hashedPassword,
  });

  await UserRepository.save(user);

  // ============== GENERATE TOKEN ============== //
  const token = generateToken({id: user.id, email: user.email});

  res.json({ message: "User created successfully", success: true, token });

});

// ============= LOGIN USER ============= //
export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginType = req.body;

  // ============= INPUT VALIDATION ============= //
  if (!email || !password) return next(new AppError("Please provide all fields", StatusCode.BAD_REQUEST));

  // ============= CHECK IF USER EXISTS ============= //
  const user = await UserRepository.findOne({ where: { email } });
  if (!user) return next(new AppError("Invalid credentials", StatusCode.UNAUTHORIZED));

  // ============= CHECK PASSWORD ============= //
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("Invalid credentials", StatusCode.UNAUTHORIZED));

  // ============== GENERATE TOKEN ============== //
  const token = generateToken({id: user.id, email: user.email});

  res.json({ message: "User logged in successfully", success: true, token });
});

// =================== USER  PROFILE ================= //
export const userProfile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user.id;
  if (!id) return next(new AppError("User not found", StatusCode.NOT_FOUND));

  const user = await getUser(id, next);
  if (!user) return next(new AppError("User not found", StatusCode.NOT_FOUND));
  res.json({ user, success: true });

});
