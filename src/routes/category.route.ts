import { Router } from "express";
import { getCategories, postCategory } from "../controllers/category.controller";
import { userAuth } from "../middlewares/adminAuth.middleware";

const categoryRouter = Router();

categoryRouter.get("/", getCategories);

categoryRouter.use(userAuth);

categoryRouter.post("/", postCategory);


export default categoryRouter;