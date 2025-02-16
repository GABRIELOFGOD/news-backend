import { NextFunction, Request, Response } from "express";
import catchAsync from "../middlewares/catchAsync.middleware";
import { uploadImageToCloudinary } from "../services/uploadImage";

export const postNews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Blog created" });
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
