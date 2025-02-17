import { NextFunction, Response } from "express";
import catchAsync from "../middlewares/catchAsync.middleware";
import { uploadImageToCloudinary } from "../services/uploadImage";
import { Request } from "../@types/custom.d";
import { CategoryRepository, NewsRepository, UserRepository } from "../services/repositories";
import { AppError } from "../middlewares/error.middleware";
import { StatusCode } from "../services/statusCode";
import { NewsStatus } from "../@types/news";

export const postNews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("req.body", req.body);
  interface RequestBody {
    topic: string;
    content: string;
    banner: string;
    tags: string[];
    description?: string;
    state?: NewsStatus;
  }
  const { topic, content, banner, tags, description, state }: RequestBody = req.body;

  // ============== INPUT VALIDATION ============== //
  if ( !topic || !content || !banner || !tags ) return next(new AppError("All fields are required", StatusCode.BAD_REQUEST));

  // ================== CHECKING IF BLOG ALREADY EXISTS ================ //
  const blogExists = await NewsRepository.findOne({ where: { topic } });
  if (blogExists) return next(new AppError("Blog already exists", StatusCode.BAD_REQUEST));

  // ================== CREATING BLOG ================ //
  const user = req.user?.id;
  if (!user) return next(new AppError("User not found", StatusCode.NOT_FOUND));

  const poster = await UserRepository.findOne({
    where: { id: user }
  });
  if (!poster) return next(new AppError("User not found", StatusCode.NOT_FOUND));

  const blog = NewsRepository.create({
    topic,
    content,
    banner,
    user: poster,
    description,
    status: state === NewsStatus.PUBLISHED ? NewsStatus.PUBLISHED : NewsStatus.DRAFT
  });

  // ============== CHECKING FOR TAGS ============== //
  if (tags.length < 1) return next(new AppError("Categories are required", StatusCode.BAD_REQUEST));

  for (let tag in tags) {
    const category = await CategoryRepository.findOne({ where: { name: tag } });
    if (!category) return next(new AppError("Category not found", StatusCode.NOT_FOUND));
    blog.categories.push(category);
  }

  await NewsRepository.save(blog);
  res.json({ message: "Blog created successfully", success: true });
  
});

export const getNews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Blog details" });
});

export const getNewsById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Blog details" });
});

export const updateNews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Blog updated" });
});

export const deleteNews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Blog deleted" });
});

export const uploadImage = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  const url = await uploadImageToCloudinary(file);
  res.json({ url });
});
