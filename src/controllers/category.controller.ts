import { NextFunction, Response } from "express";
import catchAsync from "../middlewares/catchAsync.middleware";
import { Request } from "../@types/custom";
import { AppError } from "../middlewares/error.middleware";
import { StatusCode } from "../services/statusCode";
import { getUser } from "../services/getUser";
import { CategoryRepository } from "../services/repositories";

export const postCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  interface categoryBody {
    name: string;
    description?: string;
  }

  const { name, description }: categoryBody = req.body;
  if (!name) return next(new AppError("At least category name should be provided", StatusCode.BAD_REQUEST));

  const user = await getUser(req.user?.id, next);
  if (!user) return next(new AppError("User not found", StatusCode.NOT_FOUND));

  const newCategory = CategoryRepository.create({
    name,
    description,
    createdBy: user
  });

  await CategoryRepository.save(newCategory);
  res.json({
    message: "Category created successfully",
    success: true,
    category: newCategory,
  });

});

export const getCategories = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const categories = await CategoryRepository.find();
  res.json({ categories, success: true });
});
