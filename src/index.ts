import express, { NextFunction, Request, Response, Application } from "express";
import { PORT } from "./config/env";
import cors from "cors";
import userRouter from "./routes/user.route";
import newsRouter from "./routes/news.route";
import { AppError, globalErrorHandler } from "./middlewares/error.middleware";
import dbConfig from "./config/database.config";
import { dataSource } from "./config/dataSource";
import categoryRouter from "./routes/category.route";

const app: Application = express();
dbConfig();
// ============= MIDDLEWARES ============= //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "*"
}));

// ============= ROUTES ============= //
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to News Server" });
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: any) => {
    console.error("Error during Data Source initialization", err);
  });

// ============= SERVER ============= //
app.use("/api/v1/users", userRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/category", categoryRouter);

// ============= GLOBAL ERROR HANDLER ============= //
app.all("*", (req: Request, res: Response, next: NextFunction) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("SERVER RUNNING ON PORT " + PORT + " IN " + process.env.NODE_ENV + " MODE");
});