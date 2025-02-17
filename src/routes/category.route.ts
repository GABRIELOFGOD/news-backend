import { Router } from "express";
import { postCategory } from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post("/", postCategory);

export default categoryRouter;