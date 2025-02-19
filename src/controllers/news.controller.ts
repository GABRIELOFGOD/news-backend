import { NextFunction, Response } from "express";
import catchAsync from "../middlewares/catchAsync.middleware";
import { uploadImageToCloudinary } from "../services/uploadImage";
import { Request } from "../@types/custom.d";
import { CategoryRepository, NewsRepository, UserRepository } from "../services/repositories";
import { AppError } from "../middlewares/error.middleware";
import { StatusCode } from "../services/statusCode";
import { NewsStatus } from "../@types/news";

export const postNews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  interface RequestBody {
    topic: string;
    content: string;
    tags: string[];
    description?: string;
    state?: NewsStatus;
  }
  const { topic, content, tags, description, state }: RequestBody = req.body;

  // ============== INPUT VALIDATION ============== //
  if ( !topic || !content || !tags ) return next(new AppError("All fields are required", StatusCode.BAD_REQUEST));

  if (!req.file) return next(new AppError("Banner is required", StatusCode.BAD_REQUEST));

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
    banner: req.file.path,
    user: poster,
    description,
    status: state === NewsStatus.PUBLISHED ? NewsStatus.PUBLISHED : NewsStatus.DRAFT,
    categories: []
  });

  // ============== CHECKING FOR TAGS ============== //
  let parsedTags: string[] = [];

  if (typeof tags === "string") {
    try {
      parsedTags = JSON.parse(tags);
    } catch (error) {
      return next(new AppError("Invalid tags format", StatusCode.BAD_REQUEST));
    }
  } else {
    parsedTags = tags;
  }

  for (const tag of parsedTags) {
    const trimmedTag = tag;
  
    const category = await CategoryRepository.findOne({ where: { name: trimmedTag } });
  
    if (!category) {
      return next(new AppError(`Category "${trimmedTag}" not found`, StatusCode.NOT_FOUND));
    } else {
      blog.categories.push(category);
    }
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
