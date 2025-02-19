import { Router } from "express";
import { deleteNews, getNews, getNewsById, postNews, updateNews, uploadImage } from "../controllers/news.controller";
import multer from "multer";
import { userAuth } from "../middlewares/adminAuth.middleware";

const newsRouter = Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

newsRouter.get("/", getNews);

newsRouter.get("/:id", getNewsById);

newsRouter.put("/:id", updateNews);

newsRouter.delete("/:id", deleteNews);

newsRouter.post("/upload", upload.single("image"), uploadImage);

// ============== PROTECTED ============== //
newsRouter.use(userAuth);

newsRouter.post("/", upload.single("banner"), postNews);

export default newsRouter;